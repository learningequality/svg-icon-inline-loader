var fs = require('fs');
var path = require('path');
var SVGO = require('svgo');
var simpleHtmlTokenizer = require('simple-html-tokenizer');

var SELF_CLOSING_SVG = new RegExp(`<svg[^>]+?\/>`, 'gi');

module.exports = function (content) {
  var loader = this;
  this.cacheable && this.cacheable();

  return content.replace(SELF_CLOSING_SVG, function (matchedSVG) {
    var filePath = null;
    var tokenizedSVG = simpleHtmlTokenizer.tokenize(matchedSVG);
    var SVGAttributes = tokenizedSVG[0].attributes;

    // if does not have src or icon-name attributes, return same svg
    var srcOrIconName = hasSrcOrIconName(SVGAttributes);
    if (srcOrIconName[0] === false) {
      return matchedSVG;
    } else if (srcOrIconName[1] == 'src') {
      var src = srcOrIconName[2];
      filePath = path.join(loader.context, src);
    } else if (srcOrIconName[1] == 'icon-name') {
      var iconName = srcOrIconName[2];
      filePath = generateLibraryIconPath(iconName);
    }

    try {
      var fileContent = fs.readFileSync(filePath, {encoding: 'utf-8'});
      loader.addDependency(filePath);
      return tidySVG(fileContent, SVGAttributes);
    } catch (e) {
      console.error('SVG Path does not exist.');
    }
  });
};

// Checks if a src or icon-name attribute exists.
// If no, returns [false, null, null]
// If src, returns [true, 'src', path]
// If icon-name, returns [true, icon-name', iconName]
function hasSrcOrIconName(SVGAttributes) {
  for (var i = 0; i < SVGAttributes.length; i++) {
    if (SVGAttributes[i][0] == "src") {
      var path = SVGAttributes[i][1];
      return [true, 'src', path];
    }
    if (SVGAttributes[i][0] == "icon-name") {
      var iconName = SVGAttributes[i][1];
      return [true, 'icon-name', iconName];
    }
  }
  return [false, null, null];
}

function generateLibraryIconPath(iconName) {
  // Name has to be in the following format: material-action-check_circle
  var splitName = iconName.split('-');
  var type = splitName[0];
  if (type == 'material') {
    var category = splitName[1];
    var name = splitName[2];
    return generateMaterialIconPath(category, name);
  } else {
    throw 'Currently only Material Icons are supported. They have to be prefixed with "material" e.g. material-action-check_circle';
  }
}

function generateMaterialIconPath(category, name) {
  var materialIconName = 'ic_' + name + '_24px.svg';
  return path.resolve(path.join('node_modules', 'material-design-icons', category, 'svg', 'production', materialIconName));
}

function tidySVG(svg, SVGAttributes) {
  // run the SVG contents through an optimizer to clean it up and normalize it
  var svgo = new SVGO({plugins: [{removeTitle: true}]});
  svgo.optimize(svg, function (result) {
    // It's callback, but this is actually run synchronously
    svg = result.data;
  });

  // remove src and icon-name from svg
  SVGAttributes = SVGAttributes.filter(function (attribute) {
    return (attribute[0] != 'src') && (attribute[0] != 'name');
  });

  var svgHead = svg.slice(0, 4);
  var svgTail = svg.slice(4);
  var SVGAttributesStringified = '';

  SVGAttributes.forEach(function (attr) {
    SVGAttributesStringified = SVGAttributesStringified + ' ' + attr[0] + '="' + attr[1] + '" ';
  });

  return (svgHead + ' role="presentation" focusable="false" ' + SVGAttributesStringified + svgTail);
}

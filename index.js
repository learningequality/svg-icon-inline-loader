var fs = require('fs');
var path = require('path');
var SVGO = require('svgo');
var simpleHtmlTokenizer = require('simple-html-tokenizer');

var SELF_CLOSING_SVG = new RegExp(`<svg[^>]+?\/>`, 'gi');
var svgo = new SVGO({plugins: [{removeTitle: true}]});


module.exports = function (content) {
  this.cacheable && this.cacheable();
  var loader = this;

  content = content.replace(SELF_CLOSING_SVG, function (matchedSVG) {
      // console.log(matchedSVG);
      var tokenizedSVG = simpleHtmlTokenizer.tokenize(matchedSVG);
      var SVGAttributes = tokenizedSVG[0].attributes;
      var hasLocalSrc = false;
      var localSrcPath = null;
      var filePath = null;
      var name = null;

      for (var i = 0; i < SVGAttributes.length; i++) {
        if (SVGAttributes[i][0] == "src") {
          hasLocalSrc = true;
          localSrcPath = SVGAttributes[i][1];
          break;
        }
      }

      if (hasLocalSrc) {
        filePath = path.join(loader.context, localSrcPath);

      } else {
        for (var i = 0; i < SVGAttributes.length; i++) {
          if (SVGAttributes[i][0] == "name") {
            name = SVGAttributes[i][1];
            break;
          }
        }
        var splitName = name.split('-');
        var iconType = splitName[0];
        var iconCategory = splitName[1];
        var iconName = splitName[2];
        var materialIconName = 'ic_' + iconName + '_24px.svg';
        if (iconType != 'material') {
          throw 'icon name must be prefixed with material';
        }
        // smh
        filePath = path.resolve(path.join('node_modules', 'material-design-icons', iconCategory, 'svg', 'production', materialIconName));
      }


      try {
        var fileContent = fs.readFileSync(filePath, {encoding: 'utf-8'});
      } catch (e) {
        console.error('Invalid icon name.');
      }


      loader.addDependency(filePath);
      // remove src and name from svg
      var newSVGAttributes = SVGAttributes.filter(function (attribute) {
        return (attribute[0] != 'src') && (attribute[0] != 'name');
      });

      // run the SVG contents through an optimizer to clean it up and normalize it
      svgo.optimize(fileContent, function (result) {
        // It's callback, but this is actually run synchronously
        fileContent = result.data;
      });

      var beginning = fileContent.slice(0, 4);
      var end = fileContent.slice(4);
      var oldAttributes = '';

      newSVGAttributes.forEach(function (attr) {
        oldAttributes = oldAttributes + ' ' + attr[0] + '="' + attr[1] + '" ';
      });
      return (beginning + oldAttributes + end);
    }
  );
  return content;
};

var SVG_PATTERN = /<[\n\r\s]*svg[\n\r\s]+(.*?)[\n\r\s]*src[\n\r\s]*=[\n\r\s]*[\"\'](.*?\.svg)[\"\'][\n\r\s]*((.|[\r\n])*?)[\n\r\s]*(\/>|>[\n\r\s]*<\/[\n\r\s]*svg[\n\r\s]*>)/gi;

var QUOTE_PATTERN_STR = `*["']?((?:.(?!["']?\\s+(?:\\S+)=|[>"']))+.)["']?`;
var ATTRIBUTE_PATTERN = new RegExp(`(\\S+)\\s*=\\s` + QUOTE_PATTERN_STR, 'gi');

var fs = require('fs');
var path = require('path');
var SVGO = require('svgo');

var svgo = new SVGO({
  plugins: [
    {
      removeTitle: true
    }
  ]
});

module.exports = function (content) {
  this.cacheable && this.cacheable();
  var loader = this;
  // process SVG
  content = content.replace(SVG_PATTERN, function (match, preAttributes, fileName, postAttributes) {
    var filePath = path.join(loader.context, fileName);
    loader.addDependency(filePath);

    // First, find a list of all attribute names on the input placeholder tag
    var inputAttributeNames = [];
    var currentMatch = null;
    while (currentMatch = ATTRIBUTE_PATTERN.exec(preAttributes)) {
      inputAttributeNames.push(currentMatch[1]); // first match group
    }
    while (currentMatch = ATTRIBUTE_PATTERN.exec(postAttributes)) {
      inputAttributeNames.push(currentMatch[1]); // first match group
    }

    // load up the actual SVG contents
    var fileContent = fs.readFileSync(filePath, {encoding: 'utf-8'});

    // run the SVG contents through an optimizer to clean it up and normalize it
    svgo.optimize(fileContent, function (result) {
      // It's callback, but this is actually run synchronously
      fileContent = result.data;
    });

    // opening tag - simple parsing because of standardized output from SVGO
    outputSvgStr = fileContent.substr(0, fileContent.indexOf('>'));

    // Add in some standardized accessibility attributes
    outputSvgStr = outputSvgStr.replace(/^<svg/i, '<svg role="presentation" focusable="false" ');
    // Any attributes on the placeholder tag should take precedence over
    // attributes of the same name in the actual SVG file, or the a11y attributes above.
    inputAttributeNames.forEach(function(attr) {
      var re = new RegExp(attr + `\\s*=\\s` + QUOTE_PATTERN_STR, 'gi');
      outputSvgStr = outputSvgStr.replace(re, '');
    });

    outputSvgStr += ' ' + preAttributes + ' ' + postAttributes + '>';

    return fileContent.replace(/^<svg.+?>/, outputSvgStr);
  });
  return content;
};

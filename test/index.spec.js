var should = require('should');
var loader = require('../index');

function load(content, callback) {
  return loader.call({
    cacheable: function () {
    },
    addDependency: function () {
    },
    context: __dirname,
    async: function () {
      return callback
    }
  }, content);
}

describe('svg inline loader', function () {
  it('should handle the scr attribute', function () {
    var input = '<svg src="./basic.svg"/>';
    var expectedOutput = '<svg role="presentation" focusable="false" fill="red" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';
    var actualOutput = load(input);
    should.equal(actualOutput, expectedOutput);
  });

    it('should clean up an svg', function () {
    var input = '<svg src="./complex.svg"/>';
    var expectedOutput = '<svg role="presentation" focusable="false" width="18" height="19" viewBox="0 0 18 19" xmlns="http://www.w3.org/2000/svg"><desc>Meaningful Description</desc><path d="M9 9c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0 3c-2.7 0-8 1.3-8 4v2h16v-2c0-2.7-5.3-4-8-4z" stroke-width="2" fill="none" fill-rule="evenodd" stroke-linecap="round" opacity=".7" stroke-linejoin="round"/></svg>';
    var actualOutput = load(input);
    should.equal(actualOutput, expectedOutput);
  });

  it('should handle the icon-name attribute consisting of a material icon name', function () {
    var input = '<svg icon-name="material-social-whatshot"/>';
    var expectedOutput = '<svg role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/></svg>';
    var actualOutput = load(input);
    should.equal(actualOutput, expectedOutput);
  });

  it('should handle the icon-name attribute consisting of a multi-word material icon name', function () {
    var input = '<svg icon-name="material-places-fitness_center"/>';
    var expectedOutput = '<svg role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/></svg>';
    var actualOutput = load(input);
    should.equal(actualOutput, expectedOutput);
  });

  it('should handle the icon-name attribute consisting of an ionicon icon name', function () {
    var input = '<svg icon-name="ion-flame"/>';
    var expectedOutput = '<svg role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path d="M128.922 320c13.05 134 103.764 160 126.932 160 23.168 0 127.457-40.49 128.142-160 .836-146-121.586-143-95.895-288-86.674 64-169.812 178.816-159.179 288zm86.745 48c0-44.183 40.187-80 40.187-80s40.701 35.817 40.701 80c0 44.184-40.701 80-40.701 80s-40.187-35.816-40.187-80z"/></svg>';
    var actualOutput = load(input);
    should.equal(actualOutput, expectedOutput);
  });

  it('should handle the icon-name attribute consisting of a mult-word ionicon icon name', function () {
    var input = '<svg icon-name="ion-ios_flame"/>';
    var expectedOutput = '<svg role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path d="M223.899 32c25.691 145-96.732 142-95.895 288 .686 119.51 104.975 160 128.143 160 23.166 0 113.88-26 126.931-160 10.633-109.184-72.506-224-159.179-288zm32.248 440s-40.701-35.816-40.701-80c0-44.183 40.555-80 40.555-80s40.332 35.817 40.332 80c-.001 44.184-40.186 80-40.186 80z"/></svg>';
    var actualOutput = load(input);
    should.equal(actualOutput, expectedOutput);
  });

  it('should throw an error when the icon-name is missing a prefix', function () {
    var input = '<svg icon-name="social-whatshot"/>';
    (function () {
      (load(input));
    }).should.throw(Error);
  });

  it('should throw an error when the a icon that does not exist is referenced', function () {
    var input = '<svg icon-name="material-social-fiesta"/>';
    (function () {
      (load(input));
    }).should.throw(Error);
  });

  it('should throw an error when the "name" part of the icon-name for a material icon is improperly formatted', function () {
    var input = '<svg icon-name="material-social-fitness-center"/>';
    (function () {
      (load(input));
    }).should.throw(Error);
  });

  it('should throw an error when the "name" part of the icon-name for a ionicon icon is improperly formatted', function () {
    var input = '<svg icon-name="ion-ios-flame"/>';
    (function () {
      (load(input));
    }).should.throw(Error);
  });

  it('should add attributes that are given', function () {
    var input = '<svg class="basicIcon" src="./basic.svg" />';
    var expectedOutput = '<svg role="presentation" focusable="false" class="basicIcon" fill="red" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';
    var actualOutput = load(input);
    should.equal(actualOutput, expectedOutput);
  });

  it('should be able to handle vue attributes', function () {
    var input = '<svg v-if="isBasic" :randomprop="false" src="./basic.svg"/>';
    var expectedOutput = '<svg role="presentation" focusable="false" v-if="isBasic" :randomprop="false" fill="red" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';
    var actualOutput = load(input);
    should.equal(actualOutput, expectedOutput);
  });

  it('should place new attributes before original attributes', function () {
    var input = '<svg src="./basic.svg" fill="blue"/>';
    var expectedOutput = '<svg role="presentation" focusable="false" fill="blue" fill="red" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';
    var actualOutput = load(input);
    should.equal(actualOutput, expectedOutput);
  });

  it('should return the same input if no "src" or "icon-name" attributes are provided', function () {
    var input = '<svg class="random-class">';
    var expectedOutput = '<svg class="random-class">';
    var actualOutput = load(input);
    should.equal(actualOutput, expectedOutput);
  });
});

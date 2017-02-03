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
  it('should handle the `mat-svg` tag', function () {
    var input = '<mat-svg category="places" name="fitness_center"/>';
    var expectedOutput = '<svg role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/></svg>';
    var actualOutput = load(input);
    should.equal(actualOutput, expectedOutput);
  });
  it('should throw an error if the `mat-svg` tag is missing the category attribute', function () {
    var input = '<mat-svg name="fitness_center"/>';
    (function () {
      (load(input));
    }).should.throw(Error);
  });
  it('should throw an error if the `mat-svg` tag is missing the name attribute', function () {
    var input = '<mat-svg category="places"/>';
    (function () {
      (load(input));
    }).should.throw(Error);
  });
  it('should throw an error if the `mat-svg` tag name attribute contains hyphens', function () {
    var input = '<mat-svg category="places" name="fitness-center"/>';
    (function () {
      (load(input));
    }).should.throw(Error);
  });
  it('should throw an error if the `mat-svg` tag name attribute contains spaces', function () {
    var input = '<mat-svg category="places" name="fitness center"/>';
    (function () {
      (load(input));
    }).should.throw(Error);
  });


  it('should handle the `ion-svg` tag', function () {
    var input = '<ion-svg name="ios-flame"/>';
    var expectedOutput = '<svg role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path d="M223.899 32c25.691 145-96.732 142-95.895 288 .686 119.51 104.975 160 128.143 160 23.166 0 113.88-26 126.931-160 10.633-109.184-72.506-224-159.179-288zm32.248 440s-40.701-35.816-40.701-80c0-44.183 40.555-80 40.555-80s40.332 35.817 40.332 80c-.001 44.184-40.186 80-40.186 80z"/></svg>';
    var actualOutput = load(input);
    should.equal(actualOutput, expectedOutput);
  });
  it('should throw an error if the `ion-svg` tag is missing the name attribute', function () {
    var input = '<ion-svg/>';
    (function () {
      (load(input));
    }).should.throw(Error);
  });
  it('should throw an error if the `ion-svg` tag name attribute contains underscores', function () {
    var input = '<ion-svg name="ios_flame"/>';
    (function () {
      (load(input));
    }).should.throw(Error);
  });
  it('should throw an error if the `ion-svg` tag name attribute contains spaces', function () {
    var input = '<ion-svg name="ios flame"/>';
    (function () {
      (load(input));
    }).should.throw(Error);
  });


  it('should handle the `file-svg` tag', function () {
    var input = '<file-svg src="./basic.svg"/>';
    var expectedOutput = '<svg role="presentation" focusable="false" fill="red" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';
    var actualOutput = load(input);
    should.equal(actualOutput, expectedOutput);
  });
  it('should throw an error if the `file-svg` tag is missing the src attribute', function () {
    var input = '<file-svg/>';
    (function () {
      (load(input));
    }).should.throw(Error);
  });


  it('should clean up the svg', function () {
    var input = '<file-svg src="./complex.svg"/>';
    var expectedOutput = '<svg role="presentation" focusable="false" width="18" height="19" viewBox="0 0 18 19" xmlns="http://www.w3.org/2000/svg"><desc>Meaningful Description</desc><path d="M9 9c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0 3c-2.7 0-8 1.3-8 4v2h16v-2c0-2.7-5.3-4-8-4z" stroke-width="2" fill="none" fill-rule="evenodd" stroke-linecap="round" opacity=".7" stroke-linejoin="round"/></svg>';
    var actualOutput = load(input);
    should.equal(actualOutput, expectedOutput);
  });


  it('should throw an error when an icon that does not exist is referenced', function () {
    var input = '<mat-svg category="places" name="the_club"/>';
    (function () {
      (load(input));
    }).should.throw(Error);
  });


  it('should add attributes that are given', function () {
    var input = '<file-svg class="basicIcon" src="./basic.svg" />';
    var expectedOutput = '<svg role="presentation" focusable="false" class="basicIcon" fill="red" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';
    var actualOutput = load(input);
    should.equal(actualOutput, expectedOutput);
  });

  it('should be able to handle vue attributes', function () {
    var input = '<file-svg v-if="isBasic" :randomprop="false" src="./basic.svg"/>';
    var expectedOutput = '<svg role="presentation" focusable="false" v-if="isBasic" :randomprop="false" fill="red" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';
    var actualOutput = load(input);
    should.equal(actualOutput, expectedOutput);
  });

  it('should place new attributes before original attributes', function () {
    var input = '<file-svg src="./basic.svg" fill="blue"/>';
    var expectedOutput = '<svg role="presentation" focusable="false" fill="blue" fill="red" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';
    var actualOutput = load(input);
    should.equal(actualOutput, expectedOutput);
  });
});

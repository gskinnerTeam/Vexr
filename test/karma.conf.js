module.exports = function (config) {
  config.set({
    browsers: [ "PhantomJS" ],
    frameworks: [ "mocha", "chai" ],
    basePath: "../",
    files: [
      "dist/vex.js",
      "test/**/*.js"
    ],
    reporters: [ "mocha" ]
  });
};

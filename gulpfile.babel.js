import gulp from "gulp";
import rollup from "rollup-stream";
import babel from "rollup-plugin-babel";
import source from "vinyl-source-stream";
import rename from "gulp-rename";
import uglify from "gulp-uglify";
import sourcemaps from "gulp-sourcemaps";
import buffer from "vinyl-buffer";
import karma from "karma";

const paths = {
  entry: "./src/main.js",
  dist: "./dist/",
  sourceFiles: "./src/**/*.js",
  sourcemaps: ".",
  testConfig: `${__dirname}/test/karma.conf.js`
};

const buildCaches = {};

function mapFile (filename) {
  return filename.replace(".js", "");
}

function bundle (options, filename, minify) {
  if (buildCaches[filename] != null) { options.cache = buildCaches[filename]; }
  options.entry = paths.entry;

  let b = rollup(options)
    .on("bundle", bundle => buildCaches[filename] = bundle) // cache bundle for re-bundles triggered by watch
    .pipe(source(paths.entry))
    .pipe(buffer())
    .pipe(rename(filename))
  if (minify) {
    b = b
    .pipe(uglify());
  } else {
    b = b
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write(paths.sourcemaps, { mapFile }));
  }
  return b.pipe(gulp.dest(paths.dist));
}

gulp.task("bundle:es6", function (done) {
  let options = { format: "es" };
  bundle(options, "vex.es6.js");
  done();
});

gulp.task("bundle:cjs", function (done) {
  let options = {
    format: "cjs",
    plugins: [ babel() ]
  }
  bundle(options, "vex.c.js", false);
  bundle(options, "vex.c.min.js", true);
  done();
});

gulp.task("bundle:global", function (done) {
  let options = {
    format: "iife",
    moduleName: "Vex",
    plugins: [ babel() ]
  };
  bundle(options, "vex.js", false);
  bundle(options, "vex.min.js", true);
  done();
});

gulp.task("watch", function () {
  // only rebundle the global module for testing
  gulp.watch(paths.sourceFiles, gulp.series("bundle:global"));
});

gulp.task("karma", function (done) {
  new karma.Server({ configFile: paths.testConfig }, function () { done(); }).start();
});


gulp.task("build", gulp.parallel("bundle:es6", "bundle:cjs", "bundle:global" ));
gulp.task("test", gulp.series("bundle:global", gulp.parallel("watch", "karma")));

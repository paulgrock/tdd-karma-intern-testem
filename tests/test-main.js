var tests = [];
for (var file in window.__karma__.files) {
    if (/test\.js$/.test(file)) {
        tests.push(file);
    }
}
requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/public/javascripts',


    paths: {
        jquery: '../vendor/jquery/jquery',
        lodash: '../vendor/lodash/lodash'
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});

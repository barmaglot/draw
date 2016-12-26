// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: 'js/app',
    paths: {
        libs: '../libs'
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
require(['libs/underscore', 'libs/js.class/class', 'config'], function () {
    require(['main']);
});
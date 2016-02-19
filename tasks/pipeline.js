var cssFilesToInject = [
'styles/importer.css'
// 'styles/**/*.css'
];
var jsFilesToInject = [
  'js/dependencies/sails.io.js',
  'js/jquery.min.js',
  'js/angular.min.js',
  'js/angular-route.min.js',
  'js/ui-bootstrap-tpls.min.js',
  'js/bootstrap.min.js',
  'js/app.js',
  'js/dependencies/services/TodoService.js',
  'js/dependencies/**/*.js',

  //'js/**/*.js'
  ];

var templateFilesToInject = [
'templates/*.html'
];

module.exports.cssFilesToInject = cssFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
  return 'assets/' + path;
});

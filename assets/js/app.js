'use strict';

var todoApp = angular.module('todoApp', ['ngRoute', 'ui.bootstrap'])
todoApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '/templates/todo.html',
      controller: 'TodoCtrl'
    }).otherwise({
      redirectTo: '/',
      caseInsensitiveMatch: true
    })
  }])

todoApp.controller('TodoCtrl', ['$scope', '$rootScope', '$http', '$sce', function($scope, $rootScope, $http, $sce) {
  $scope.formData = {};
  $scope.query = '';

  $scope.load = function(){
    $scope.slides = null;
    var url = 'https://api.vagalume.com.br/search.artmus?q='+encodeURIComponent($scope.query)+'&limit=12'
    $http.get(url)
    .then(function(data) {
        console.log(data);
        $scope.musics = data.data.response.docs;
    });
  };

  $scope.initSlide = function(music){
    $scope.musics = null;
    var url = 'https://api.vagalume.com.br/search.php?art='+encodeURIComponent(music.band)+'&mus='+encodeURIComponent(music.title)+'&apiKey=8f46a43841039c0c36cd04b2bba5c841';
    $http.get(url)
    .then(function(data) {
        var text = data.data.mus[0].text;
        text = text.split("\n\n");

        for (var i = text.length - 1; i >= 0; i--) {
          text[i] = text[i].replace(/\n/g,'<br>')
          text[i] = $sce.trustAsHtml(text[i]);
        }

        $scope.slides = text;
    });
  }

}])

'use strict';

var todoApp = angular.module('todoApp', ['ngRoute', 'ui.bootstrap'])

todoApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: '/templates/home.html'
    })
    .when('/search/:query', {
      templateUrl: '/templates/result.html',
      controller: 'searchController'
    })
    .when('/slider/:id', {
      templateUrl: '/templates/slider.html',
      controller: 'sliderController'
    })
    .otherwise({
      redirectTo: '/',
      caseInsensitiveMatch: true
    })
  }
]);

todoApp.directive('header', function () {
    return {
        restrict: 'A',
        replace: true,
        scope: {user: '='}, // This is one of the cool things :). Will be explained in post.
        templateUrl: "/templates/partials/header.html",
        controller: ['$scope', '$location', function ($scope, $location) {
            
          $scope.query = '';

          $scope.search = function(){
            $location.url("/search/"+encodeURIComponent($scope.query));
          }

        }]
    }
});

todoApp.controller('searchController', ['$scope', '$routeParams', '$http', '$sce', '$location', function($scope, $routeParams, $http, $sce, $location) {

  $scope.query = $routeParams.query;
  $scope.loading = true;

  var url = 'https://api.vagalume.com.br/search.artmus?q='+$scope.query+'&limit=12';

  $http.get(url)
  .then(function(data) {
      $scope.loading = false;
      $scope.musics = data.data.response.docs;
  });

  $scope.load = function(id){
    $location.url("/slider/"+id)
  }

}])

todoApp.controller('sliderController', ['$window', '$scope', '$routeParams', '$http', '$sce', '$location', function($window, $scope, $routeParams, $http, $sce, $location) {

  $scope.musicid = $routeParams.id;
  $scope.loading = true;

  var url = 'https://api.vagalume.com.br/search.php?musid='+$scope.musicid+'&apiKey=8f46a43841039c0c36cd04b2bba5c841';

  $http.get(url)
  .then(function(data) {
      $scope.loading = false;
      var text = data.data.mus[0].text;
      text = text.replace(/Refrão\n/g,'');
      text = text.replace(/refrão\n/g,'');
      text = text.split("\n\n");

      for (var i = text.length - 1; i >= 0; i--) {
        text[i] = text[i].replace(/\n/g,'<br>')
        text[i] = $sce.trustAsHtml(text[i]);
      }

      $scope.slides = text;
  });

  $scope.slideNow = function(){
    $("#slider").addClass("slideNow").find(".slide").eq(0).addClass("active");
    $(document).keydown(function(){
      var el = $(".slide.active");
      if(event.keyCode == 40 && el.next(".slide").length > 0){
        el.removeClass("active").next(".slide").addClass("active");
      }
      if(event.keyCode == 38 && el.prev(".slide").length > 0){
        el.removeClass("active").prev(".slide").addClass("active");
      }
      if(event.keyCode == 27){
        $window.location.reload();
      }
    })
  }

}])
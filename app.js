'use strict';

var app = angular.module('moviecat', [
	'ngRoute',
	'moviecat.movie_list',
	'moviecat.directives.auto-focus'
]);

/*服务的URL配置*/
//app.constant('AppConfig', {
//page_size: 10,
//movies_api: 'https://api.douban.com/v2/movie/',
//});

// 配置路由
app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.otherwise({
			redirectTo: '/in_theaters/1'
		});
}]);

app.controller(
	'NavController', ['$scope', '$location', function($scope, $location) {
		$scope.$location = $location;
		$scope.$watch('$location.path()', function(now) {
			if(now.startsWith('/top250')) {
				$scope.type = 'top250';
			} else if(now.startsWith('/in_theaters')) {
				$scope.type = 'in_theaters';
			} else if(now.startsWith('/coming_soon')) {
				$scope.type = 'coming_soon';
			}
		})
	}]
);

//app.controller('SearchController', ['$scope', '$location', '$routeParams', function($scope, $location, $routeParams) {
//$scope.text = '';
//$scope.search = function() {
//  $location.path('/search');
//  $location.search('q', $scope.text);
//};
//}]);
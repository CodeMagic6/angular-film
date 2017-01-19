(function(angular) {
	'use strict';

	var angularMod = angular.module('moviecat.movie_list', [
		'ngRoute',
		'moviecat.services.http'
	]);

	angularMod.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/:category/:page', {
			templateUrl: 'movie_list/view.html',
			controller: 'MovieListController'
		});
	}]);

	angularMod.controller('MovieListController', [
		'$scope',
		'$route',
		'$routeParams',
		'HttpService',
		function($scope, $route, $routeParams, HttpService) {
			var count = 10;
			var page = parseInt($routeParams.page); //页码
			var start = (page - 1) * count; //从哪开始
			$scope.subjects = [];
			$scope.title = ''
			$scope.message = '';
			$scope.totalCount = 0;
			$scope.totalPages = 0;
			$scope.currentPage = page;
			$scope.loading = true;
			HttpService.jsonp(
				'https://api.douban.com/v2/movie/' + $routeParams.category, {
					start: start,
					count: count
				},
				function(data) {
					$scope.title = data.title;
					$scope.subjects = data.subjects;
					$scope.totalCount = data.total;
					$scope.totalPages = Math.ceil($scope.totalCount / count);
					$scope.loading = false;
					$scope.$apply()
				}
			)

			//暴露一个更改上一页下一页的函数
			$scope.goPage = function(page) {

				if(page >= 1 && page <= $scope.totalPages) {
					$route.updateParams({
						page: page
					});
				}

			};
		}
	]);

})(angular);
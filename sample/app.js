var app = angular.module('Tag',[ 'iuTagManager']);
app.controller('ManagerTagController',  function ($scope) {
                $scope.listTag;
                $scope.ShowListTags = function(){
                	$scope.showTag = true;
                	console.log($scope.listTag);
                }
});
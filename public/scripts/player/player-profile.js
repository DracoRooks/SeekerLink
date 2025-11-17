const module = angular.module("PlayerProfileModule", []);
const controller = module.controller("PlayerProfileController", function($scope, $http, $window) {
    $scope.activeUserPlayerEmail = localStorage.getItem("activeUser");
})
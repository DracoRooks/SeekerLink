const module = angular.module("PlayerDashboardModule", []);
const controller = module.controller("PlayerDashboardController", function($scope, $http) {
    $scope.activeUserPlayerEmail = localStorage.getItem("activeUser");

    $scope.logout = function() {
        localStorage.removeItem("activeUser");
        $window.location.href = "/";
    }
})
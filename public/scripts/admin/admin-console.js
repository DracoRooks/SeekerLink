const module = angular.module("AdminConsoleModule", []);
const controller = module.controller("AdminConsoleController", function($scope, $http, $window){
    $scope.activeUserAdminEmail = localStorage.getItem("activeUser");

    $scope.logout = function() {
        localStorage.removeItem("activeUser");
        $window.location.href = "/";
    }
})
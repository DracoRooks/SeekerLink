const module = angular.module("OrganiserDashboardModule", []);
const controller = module.controller(function($scope){
    $scope.activeUserOrganiserEmail = localStorage.getItem("activeUser");

    $scope.logout = function() {
        localStorage.removeItem("activeUser");
        $window.location.href = "/";
    }
})
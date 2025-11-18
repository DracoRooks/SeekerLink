const module = angular.module("PlayerDashboardModule", []);
const controller = module.controller("PlayerDashboardController", function($scope, $window, $http) {
    $scope.activeUserPlayerEmail = localStorage.getItem("activeUser");

    $scope.togglePassword = function(fieldId, event) {
        var inputField = $("#" + fieldId);
        var icon = $(event.currentTarget).find("i"); // Find the icon inside the clicked button

        if (inputField.attr("type") === "password") {
            inputField.attr("type", "text");
            icon.removeClass("fa-eye").addClass("fa-eye-slash");
        } else {
            inputField.attr("type", "password");
            icon.removeClass("fa-eye-slash").addClass("fa-eye");
        }
    };

    $scope.doUpdatePassword = function() {
        // 1. Get Values using jQuery (since you aren't using ng-model in HTML)
        var oldPwd = $("#txtOldPwd").val();
        var newPwd = $("#txtNewPwd").val();
        var confirmPwd = $("#txtConfirmNewPwd").val();
        var email = $scope.activeUserPlayerEmail;

        // 2. Validation
        if (!oldPwd || !newPwd || !confirmPwd) {
            alert("Please fill in all password fields.");
            return;
        }

        if (newPwd !== confirmPwd) {
            alert("New Password and Confirm Password do not match!");
            return;
        }

        var obj = {
            email: email,
            oldPassword: oldPwd,
            newPassword: newPwd
        };

        // 3. Send Request
        $http.post("/player-update-password", obj).then(function(response) {
            // Server usually returns a simple string, but let's be safe
            var msg = typeof response.data === 'object' ? JSON.stringify(response.data) : response.data;
            alert(msg); 

            // 4. Clear Input Fields
            $("#txtOldPwd").val("");
            $("#txtNewPwd").val("");
            $("#txtConfirmNewPwd").val("");

            // 5. Close the Modal (Bootstrap 5 way)
            // We get the element, then get the existing Bootstrap instance, then hide it
            var myModalEl = document.getElementById('playerSettingsModal');
            var modal = bootstrap.Modal.getInstance(myModalEl); 
            if (modal) {
                modal.hide();
            }

        }, function(error) {
            // Handle error response
            var errMsg = (error.data && error.data.message) ? error.data.message : error.data;
            alert("Error: " + (errMsg || "Failed to update password"));
        });
    };

    // 3. Logout
    $scope.doLogout = function() {
        if (confirm("Are you sure you want to logout?")) {
            localStorage.removeItem("activeUser");
            $window.location.href = "/"; // Redirect to index
        }
    };
})
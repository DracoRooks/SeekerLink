const module = angular.module("PlayerProfileModule", []);
const controller = module.controller("PlayerProfileController", function($scope, $http, $window) {
    
    $scope.activeUserPlayerEmail = localStorage.getItem("activeUser");

    // Initialize object to store text data
    $scope.player = {
        emailId: $scope.activeUserPlayerEmail,
        name: "",
        dob: "",
        gender: "",
        address: "",
        contact: "",
        game: "",
        otherInfo: ""
    };

    // Variables to hold the actual file objects
    var adhaarFileObj = null;
    var profileFileObj = null;

    // ---------------------------------------------------------
    // 1. PREVIEW LOGIC (Updated to store the file object)
    // ---------------------------------------------------------
    $scope.previewAdhaar = function(fileInput) {
        if (fileInput.files && fileInput.files[0]) {
            adhaarFileObj = fileInput.files[0]; // STORE FILE FOR UPLOAD

            var reader = new FileReader();
            reader.onload = function(e) {
                $("#prevAdhaar").attr("src", e.target.result).css("display", "block");
                $("#adhaarPlaceholder").hide();
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
    };

    $scope.previewProfile = function(fileInput) {
        if (fileInput.files && fileInput.files[0]) {
            profileFileObj = fileInput.files[0]; // STORE FILE FOR UPLOAD

            var reader = new FileReader();
            reader.onload = function(e) {
                $("#prevProfile").attr("src", e.target.result).css("display", "block");
                $("#profilePlaceholder").hide();
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
    };

    // ---------------------------------------------------------
    // 2. SAVE DATA LOGIC (Using FormData)
    // ---------------------------------------------------------
    $scope.fxSaveData = function() {
        var url = "/player-profile-savedata";
        
        // Create FormData to send files + text
        var fd = new FormData();

        // Append Text (Keys must match req.body.KEY in Node.js)
        fd.append("txtEmailPlayerProfile", $scope.player.emailId);
        fd.append("txtName", $scope.player.name || ""); 
        // Ensure date is formatted or empty string if undefined
        fd.append("txtDob", $scope.player.dob ? new Date($scope.player.dob).toISOString().split('T')[0] : "");
        fd.append("selGender", $scope.player.gender || "");
        fd.append("txtAddress", $scope.player.address || "");
        fd.append("txtContact", $scope.player.contact || "");
        fd.append("txtGame", $scope.player.game || "");
        fd.append("txtOtherInfo", $scope.player.otherInfo || "");

        // Append Files (Keys must match req.files.KEY in Node.js)
        if (adhaarFileObj) {
            fd.append("fileAdhaar", adhaarFileObj);
        }
        if (profileFileObj) {
            fd.append("fileProfilePic", profileFileObj);
        }

        // Send POST request with correct headers
        $http.post(url, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined } // Let browser set multipart/form-data
        }).then(fxGood, fxBad);

        function fxGood(response) {
            alert("Success: " + response.data);
        }

        function fxBad(err) {
            alert("Error: " + (err.data || err.statusText));
        }
    }
});
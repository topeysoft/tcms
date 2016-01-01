angular.module('tscControllers', [])
.controller('AppCtrl', ['$scope', '$routeParams', 'Models',
    function ($scope, $routeParams, Models) {
        $scope.toggleMenu = function () {
            if ($scope.is_mobile) {
                $("body").toggleClass("show-menu");
            } else {
                $("body").toggleClass("hide-menu");
            }
        };
    }])

    .controller('ListCtrl', ['$scope', '$routeParams', 'Models',
    function ($scope, $routeParams, Models) {
        $scope.item_name = $routeParams.model;
        $scope.s_columns = { email: true, title: true, name: true }; // selected columns
        $scope.e_columns = { email: true, name: true };  // enforced columns
        $scope.r_columns = { id: true, selected: true }  // restricted columns
        $scope.toggleSelectAll = function () {
            //$scope.select_all = !$scope.select_all;
            angular.forEach($scope.items,
                            function (v, k) {
                v.selected = $scope.select_all;
            });
        }
        $scope.items = Models.query({ model: $routeParams.model }, function () {
           // console.log($scope.items);
           // $scope.items.abc = true;
           // $scope.items.$save();
        });
    }])
    
.controller('DetailCtrl', ['$scope', '$routeParams', 'Models',
    function ($scope, $routeParams, Models) {
        $scope.model_name = $routeParams.model;
        $scope.item_name = "";
        $scope.saving_changes = false;
        $scope.is_modified = false;
        
        $scope.item = Models.get({ model: $routeParams.model, id: $routeParams.id }, function () {
            $scope.item_name = $scope.item.name;
                $scope.original_item = new Models($scope.item);
            console.log("NG_MODEL:", $scope.item);
        });
        $scope.saveChanges = function () {
            $scope.saving_changes = true;
            $scope.item.$update({ model: $routeParams.model, id: $routeParams.id }, function success(resp) {
                $scope.saving_changes = false;
                ToastSuccess("Saved successfully.");
                $scope.original_item = new Models($scope.item);
                $scope.$apply();
            }, function error(e) {
                ToastError("Error saving changes.");
                $scope.saving_changes = false;
            });
        };
        

        $scope.editable = true;
        $scope.isCollection = function (value) {
            return angular.isObject(value);
        };
        
        $scope.$watchCollection(function () {
            return $scope.item;
        }, function () {
            
            if (!_.isEqual($scope.item, $scope.original_item)) {
                $scope.is_modified = true;
            } else {
                $scope.is_modified = false;
            }
        });
    }])

    .controller('CreateCtrl', ['$scope','$location', '$routeParams', 'Models',
    function ($scope, $location, $routeParams, Models) {
        $scope.model_name = $routeParams.model;
        $scope.item_name = "";
        $scope.saving_changes = false;
        $scope.is_modified = false;
        
        $scope.item = Models.getTemplate({ model: $routeParams.model }, function () {
            //$scope.item_name = $scope.item.name;
            $scope.original_item = new Models($scope.item);
               
        });
        $scope.saveChanges = function () {
            $scope.saving_changes = true;
            $scope.item.$create({ model: $routeParams.model }, function success(resp) {
                $scope.saving_changes = false;
                ToastSuccess("Created successfully.");
                $scope.original_item = new Models($scope.item);
                $location.path("/detail/" + $routeParams.model + "/" + $scope.item.id);
            }, function error(e) {
                ToastError("Error saving changes.");
                $scope.saving_changes = false;
            });
        };
        $scope.editable = true;
        $scope.isCollection = function (value) {
            return angular.isObject(value);
        };
        
        $scope.$watchCollection(function () {
            return $scope.item;
        }, function () {
            
            if (!_.isEqual($scope.item, $scope.original_item)) {
                $scope.is_modified = true;
            } else {
                $scope.is_modified = false;
            }
        });
    }])

.controller('DashCtrl', ['$scope', '$routeParams', 'Models',
    function ($scope, $routeParams, Models) {

    }])
.controller('LoginCtrl', ['$scope', '$routeParams', '$http',
    function ($scope, $routeParams, $http) {
        
        $scope.login = function (){
            console.log("LOGIN FORM OBJECT: ", $scope.loginForm);
            $http.post(AppConfig.access_management_url, { email: $scope.email, password: $scope.password }).then(
                function success(resp) {
                    console.log("SUCCESSFUL LOGIN:", resp);
                    $scope.login_error_message = '<span class="green-text">Login successful. Redirecting...</span>';
                    ToastSuccess($scope.login_error_message);
                }, function error(e) {
                    console.log("ERROR LOGING IN:", e);
                    $scope.login_error_message = '<span class="red-text">Unable to complete login</span>';
                    ToastError($scope.login_error_message);
                });
        }
    }])
.controller('RegisterCtrl', ['$scope', '$routeParams', 'Models',
    function ($scope, $routeParams, Models) {
        console.log("FIELD:", $scope.registerForm);
    }]);
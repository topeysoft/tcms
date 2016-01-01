angular.module('tscDirectives', [])
     .directive('fuzzyModal', ['$compile', function ($compile) {
         return {
             scope: {
                 src: '@',
                 template: "=",
                 selector: '@',
                 fuzzyness: '@',
                 dismissible: '=',
                 handle: '=',
                 onShow: '&onShow',
                 onHide: '&onHide',
                 onDestroy: '&onDestroy',
                 autoShow: '='
             },
             controller: ['$scope', '$http', '$log', function ($scope, $http, $log) {

                 if (typeof ($scope.selector) == "undefined") {
                     $scope.selector = 'body';
                     $scope.wrapChildren = true;
                 }
                 if (typeof ($scope.fuzzyness) == "undefined") {
                     $scope.fuzzyness = 6;
                 }

                 if (typeof ($scope.dismissible) == "undefined") {
                     $scope.dismissible = true;
                 }
                 var wrapper = angular.element('<div class="" />');




                 if (typeof ($scope.template) == "undefined") {
                     wrapper.append('<div ng-include="src"></div>');
                 } else {
                     wrapper.append('<div ng-bind-html="template"></div>');
                 }




                 $scope.html = wrapper;


             }],
             link: function ($scope, element) {
                 var options = {
                     fuzzyness: 7,
                     element: element,
                     selector: ".fuzzy"
                 };
                 $scope.handle = new FuzzyDialog(options);

                 if ($scope.autoShow) {
                     $scope.handle.show();
                 } else {
                     $scope.handle.hide();
                 }

                 if ($scope.dismissible) {
                     element.on("click", function (e) {
                         $scope.handle.hide();
                         e.stopPropagation();
                     });
                 }

                 // append the markup
                 element.addClass("blurred-dialog");
                 element.append($scope.html);
                 // compile the markup so that Angular will know about it (or use the directive `compile` rather than `link`)
                 $compile(element.contents())($scope);
             }
         };


     }])
.directive('loginView', ['$compile', function ($compile) {
    return {
        scope: {
            autoShow: '='
        },
        templateUrl: "/templates/login-view.html",
        controller: ['$scope', '$http', '$log', 'AccessWatcherService', 'AccessService',
            function ($scope, $http, $log, AccessWatcherService, AccessService) {

                if (typeof ($scope.selector) == "undefined") {
                    $scope.selector = 'body';
                    $scope.wrapChildren = true;
                }
                $scope.resetLoginView = function () {
                    $scope.email = '';
                    $scope.password = '';
                    $scope.login_error_message = '';
                }

                $scope.$watch(function () {
                    return AccessWatcherService.needs_login;
                }, function () {
                    if (AccessWatcherService.needs_login) {
                        $scope.handle.show();
                        AccessWatcherService.needs_login = false;
                    }
                });


                $scope.$watch(function () {
                    return AccessWatcherService.done_login;
                }, function () {
                    if (AccessWatcherService.done_login) {

                        $scope.resetLoginView();
                        $scope.handle.hide();
                        AccessWatcherService.done_login = false;
                    }
                });

                $scope.login = function () {
                    AccessService.logIn($scope);
                };



            }],
        link: function ($scope, element) {
            element.hide();
            var options = {
                fuzzyness: 7,
                element: element,
                // selector: ".fuzzy"
            };
            $scope.handle = new FuzzyDialog(options);

        }
    };


}])
.directive('editableText', ['$compile', function ($compile) {

    return {
        scope: {
            ngModel: '=',
            propToDisplay: '@',
                edTextOn: '=',
                key: '@'
        },
        restrict: 'AC',
        controller: ['$scope', '$log','$interval','$filter',
            function ($scope, $log, $interval, $filter) {
                    
                    $scope.tinymceOptions = {
                        onChange: function (e) {
      // put logic here for keypress and cut/paste changes
                        },
                        inline: true,
                        toolbar: 'undo redo',
                        menubar: false,
                        format: 'text'
                    };
                    if ($scope.key.toLowerCase() == "content") {
                        $scope.tinymceOptions.plugins = [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table contextmenu paste'
                        ];
                        $scope.tinymceOptions.format = "html";
                        $scope.tinymceOptions.toolbar = 'insertfile undo redo | styleselect | bold italic underline| alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image';
                    }

                    
                    if ($scope.key.toLowerCase() == "updated_at" 
                        || $scope.key.toLowerCase() == "created_at") {
                        $scope.timeAgo = "";
                        $interval(function (){
                            var t = $scope.ngModel;
                            
                            if (t) {
                                $scope.timeAgo = $filter("timeAgo")($scope.ngModel);
                            } else {
                                $scope.timeAgo= "Not Applicable.";
                            }
                            $scope.$apply();
                        }, 1000)
                        $scope.text  = "<div>{{ngModel|date:'MM/dd/yyyy @ h:mma'}}</div><i class='green-text'   >{{timeAgo}}</i>";
                    } else {
                        $scope.text = angular.element('<div class="no-dropcap" ui-tinymce="tinymceOptions" data-ng-model="ngModel" >{{ngModel}}<div>');

                    }
                $scope.wrapper = angular.element('<div />');

            }],
            link: function ($scope, element) {

            if ($scope.edTextOn) {
                    element.replaceWith($compile($scope.text)($scope));
                    element.wrap($scope.wrapper);
                    
                
            }
        }
    };


}])
.directive('inlineLoader', ['$compile', function ($compile) {
    return {
        scope: {
            size: "@",
            forAll: '='

        },
        restrict: 'EA',
        //template: "<span >{{ngModel}}<span>",
        controller: ['$scope', '$log', 'HttpWatcherService',
            function ($scope, $log, HttpWatcherService) {

                $scope.text = angular.element('<div >{{ngModel}}<div>');
                $scope.wrapper = angular.element('<div />');

                $scope.spinner = angular.element('<div class="preloader-wrapper {{size}} active">\
                                <div class="spinner-layer spinner-blue-only">\
                                  <div class="circle-clipper left">\
                                    <div class="circle"></div>\
                                  </div><div class="gap-patch">\
                                    <div class="circle"></div>\
                                  </div><div class="circle-clipper right">\
                                    <div class="circle"></div>\
                                  </div>\
                                </div>\
                              </div>');
                $scope.loader = '';
                if ($scope.forAll) {
                    //$scope.loader.hide();
                    $scope.$watch(function () {
                        return HttpWatcherService.is_active;
                    }, function () {
                        if (HttpWatcherService.is_active) {
                            $scope.loader.show();
                        } else {
                            $scope.loader.hide();
                        }

                    });
                }


            }],
        link: function ($scope, element) {
            $scope.loader = $compile($scope.spinner)($scope);

            element.append($scope.loader);
        }
    };


}])

.directive('detectMobile', ['$compile', function ($compile) {
    return {
        scope: {
            addClass: "@",
                mobileWidth: '@',
            detectMobile:'='
        },
        restrict: 'A',
        //template: "<span >{{ngModel}}<span>",
        controller: ['$scope', '$log', '$window',
            function ($scope, $log, $window) {


                if (!$scope.addClass) {
                    $scope.addClass = "is-mobile";
                }

                if (!$scope.mobileWidth) {
                    $scope.mobileWidth = 600;
                }

                //$.on('resize', function () {
                //    $scope.win_height = $(window).height();
                //    $scope.win_width = $(window).width();
                //});
                $scope.onResize = function () {
                    $scope.win_height = $window.innerHeight
                    $scope.win_width = $window.innerWidth;
                    if ($scope.win_width <= 600) {
                            angular.element('body').addClass($scope.addClass);
                            $scope.detectMobile = true;
                    } else {
                            angular.element('body').removeClass($scope.addClass);
                            $scope.detectMobile = false;
                    }
                }
                $scope.onResize();
                angular.element($window).on('resize', function () {
                    $scope.onResize();
                })
                $scope.onResize();

            }],
        link: function ($scope, element) {

            //$scope.$watch('win_width', function () {
            //    alert("hey");
            //    if ($scope.win_width <= 600) {
            //        element.addClass($scope.addClass);
            //    } else {
            //        element.removeClass($scope.addClass);
            //    }
            //});
        }
    };


}])

.directive('selectColumns', ['$compile', function ($compile) {
    return {
        scope: {
            collection: '=',
            selectedColumns: '=',
            restrictedColumns: '=',
            enforcedColumns:'='
        },
        replace:true,
        templateUrl: "/cmsadmin/partials/select-columns.html",
        controller: ['$scope', '$http', '$log',
            function ($scope, $http, $log) {

                if (!angular.isDefined($scope.selectedColumns)
                    || $scope.selectedColumns.length < 1) {
                    $scope.selectedColumns = {};
                }
                $scope.disabled = {};
                $scope.restricted = {};
                    angular.forEach($scope.enforcedColumns,
                        function (v, k) {
                            $scope.selectedColumns[k] = true;
                            $scope.disabled[k] = true;
                        });
               
               
                    angular.forEach($scope.restrictedColumns,
                        function (v, k) {
                            delete $scope.selectedColumns[k];
                            delete $scope.disabled[k];
                            $scope.restricted[k]  =true;
                        });
               

            }],
        link: function ($scope, element) {
                
                $scope.dlg = element.find('#show_c_dialog').detach().appendTo("body");
                $scope.dlg.removeAttr("id");
            $scope.showSelectColumnDialog = function () {
                    $scope.dlg.openModal();
            }

        }
    };


}])

.directive('addEditField', ['$compile', function ($compile) {
    return {
        scope: {
            field: '=',
            isEdit: '=',
            onDone:'&'
        },
        replace: true,
        templateUrl: "/templates/partials/new-field-template.html",
        controller: ['$scope', '$http', '$log', 'AccessWatcherService', 'AccessService',
            function ($scope, $http, $log, AccessWatcherService, AccessService) {

               // $scope.field_proto = angular.copy($scope.field);
            }],
        link: function ($scope, element) {

            //$scope.showSelectColumnDialog = function () {
            //    element.find('#show_c_dialog').openModal();
            //}
            $scope.showAddProperty = function () {
                element.find(".new_template_prop").openModal();
            }
            $scope.done = function () {
               // $scope.field = angular.copy($scope.field_proto);
               // $scope.field_proto = {};
                $scope.onDone();
            }


        }
    };


}])
.directive('validName', function () {
    return {
        restrict: 'A',
        scope:{
            ngModel:"="
        },
        controller: function ($scope , $filter) {
            $scope.ngModel = $filter("validname")($scope.ngModel);
            $scope.$watch(function () {
                return $scope.ngModel;
            }, function () {
                $scope.ngModel = $filter("validname")($scope.ngModel);
            });
        },
        link: function ($scope, element, attrs) {
           
        }
    };
});
;




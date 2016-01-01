angular.module("cmsadmin",
[
    'ngRoute',
    'angular-lodash',
    'ngSanitize',
    'ui.tinymce',
    'yaru22.angular-timeago',
    'tscControllers',
    'tscFilters',
    'tscDirectives',
    'tscServices',
    'ngResource',
    'tscFactory'
]
).config(['$routeProvider', '$resourceProvider',
    function ($routeProvider, $resourceProvider) {
        $routeProvider.
      when('/', {
            templateUrl: '/cmsadmin/partials/dashboard.html',
            controller: 'DashCtrl',
            resolve: {
                check: function () {
                    resolveAfterNavigation();
                }
            }
        }).
      when('/list/:model', {
            templateUrl: '/cmsadmin/partials/list.html',
            controller: 'ListCtrl',
            resolve: {
                check: function () {
                    resolveAfterNavigation();
                }
            }
        }).
        when('/create/:model', {
            templateUrl: '/cmsadmin/partials/detail.html',
            controller: 'CreateCtrl',
            resolve: {
                check: function () {
                    resolveAfterNavigation();
                }
            }
        }).
      when('/detail/:model/:id', {
            templateUrl: '/cmsadmin/partials/detail.html',
            controller: 'DetailCtrl',
            resolve: {
                check: function () {
                    resolveAfterNavigation();
                }
            }
        }).
      otherwise({
            redirectTo: '/'
        });
        
        // Don't strip trailing slashes from calculated URLs
        $resourceProvider.defaults.stripTrailingSlashes = true;
    }]);

function resolveAfterNavigation() {
    $("body").removeClass("show-menu");
}
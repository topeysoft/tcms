angular.module('tscFactory', ['ngResource'])
.factory('Models', ['$resource', function ($resource) {
        return  $resource('/api/:model/:id',
         { }, {
            get: { method: 'GET', params: { model: 'model', id:'id' }, isArray: false, headers: { "X-Topeysoft-Remove-Success": true } },
            query: { method: 'GET', params: { model: 'model' }, isArray: true, headers: {"X-Topeysoft-Remove-Success":true} },
            getTemplate: { method: 'GET', params: { model: 'model' }, url: '/api/templates/:model/:id', isArray: false, headers: { "X-Topeysoft-Remove-Success": true } },
            update: { method: 'PUT', params: { model: 'model', id: 'id' }, isArray: false, headers: { "X-Topeysoft-Remove-Success": true } },
            create: { method: 'POST', params: { model: 'model' }, isArray: false, headers: { "X-Topeysoft-Remove-Success": true } }
            //delete: { method: 'DELETE', params: {} },
        });
    }]);

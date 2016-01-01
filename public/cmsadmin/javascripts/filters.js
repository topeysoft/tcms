var tscFilters = angular.module('tscFilters', [])
.filter('spaceless', function () {
    return function (input) {
        if (input) {
            return input.replace(/\s+/g, '-');
        }
    }
})
    .filter('noUnderscore', function () {
        return function (input, r) {
            if (!r) r = '';
            if (input) {
                return input.replace(/_+/g, r);
            }
        }

    })
 .filter('initial', function () {
     return function (input) {
         if (input) {
             var s = "";
             try {
                 s = input.charAt(0);
                 s = s.toUpperCase();
             } catch (e) {

             }
             return s;
         }
     }

 })
.filter('titlecase', function () {
    return function (input) {
        if (input) {
            return input.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });

        }
    }

})
 .filter('validname', function () {
     return function (input, r) {
         if (!r) r = '_';
         if (input) {
             try {
                 input = input.toLowerCase();
             } catch (e) {

             }
             return input.replace(/\W+/g, r);
         }
     }

})
.filter('striphtml', function () {
    return function (input, r) {
        if (!r) r = '';
        if (input) {
            
            return input.replace(/(<.*?>)/g, r);
        }
    }

})
.filter('bytes', function () {
    return function (bytes, precision) {
        if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
        if (typeof precision === 'undefined') precision = 1;
        var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
            number = Math.floor(Math.log(bytes) / Math.log(1024));
        return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) + ' ' + units[number];
    }
});


/**
 * Created by Moni on 2016.12.03..
 */

(function () {
    var Service = function ($http) {
        this.getService = function () {
            return $http.get('http://localhost:1337/product',
                {
                    headers: {
                        Authorization: token,
                    }
                });
        }
    };

    angular.module('Valami').service('apiService', Service);
})();
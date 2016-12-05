/**
 * Created by Moni on 2016.12.03..
 */

(function () {
    var Service = function ($http) {
        this.getService = function () {
            return $http.get('http://localhost:1337/product',
                {
                    headers: {
                        Authorization: "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNDgwNzc0NDA2fQ.xMC6nGRJWI_yiUxsJavPQkV1CpMdeeiTmeiqMd_ExM4",
                    }
                });
        }
    };

    angular.module('Valami').service('apiService', Service);
})();
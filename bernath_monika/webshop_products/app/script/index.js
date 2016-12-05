/**
 * Created by Moni on 2016.12.03..
 */

(function () {
    angular.module('Valami', ['ngRoute'])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'main.html',
                    controller: function ($http, $routeParams, $scope) {
                        $http({
                            url: 'http://localhost:1337/product/',
                            method: 'GET',
                            headers: {
                                Authorization: token
                            }
                        }).then(function (result) {
                            $scope.products = result.data;
                            console.log(result.data);
                        })
                    }
                })
                .when('/test/:id', {
                    templateUrl: 'test.html',
                    controller: function ($http, $routeParams, $scope) {
                        $http({
                            url: 'http://localhost:1337/product/' + $routeParams.id,
                            method: 'GET',
                            headers: {
                                Authorization: token
                            }
                        }).then(function (result) {
                            $scope.products = result.data;
                            console.log(result.data);
                        })
                    }
                });
        })

        .controller('kiskutya', kiskutya);

    function kiskutya(apiService) {
        apiService.getService()
            .then(
            function (res) {
                //console.log(res);
            }
            )
            .catch(function (err) {
                console.error(err);
            })
    };
})();
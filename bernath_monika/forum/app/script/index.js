/**
 * Created by Moni on 2016.11.26..
 */

console.log(angular);


angular
    .module('Forumtop', [])
    .controller('first', First);

function First($scope, $http) {
    $scope.hello = 'hi';
    $scope.add = function () {
        $scope.value = true;
        $scope.new = {};
        console.log('nyyaaa');
        $scope.method = "POST";
    };
    $scope.newpost = function () {
        var url = "";
        if($scope.method == "POST"){
            url = '/topics';
        } else{
            url = '/topics/' + $scope.id;
        }
        $http({
            method: $scope.method,
            url: url,
            data: $scope.new
        }).then(function successCallback() {
            render();
            $scope.value = false;
            $scope.new = {};
        }, function errorCallback(response) {
            console.error(response);
        });
    };
    $scope.delete = function (id) {
        $http({
            method: 'DELETE',
            url: '/topics/' + id
        }).then(function successCallback() {
            render();
        }, function errorCallback(response) {
            console.error(response);
        });
    };
    $scope.edit = function (topic) {
        $scope.new = topic;
        $scope.value = true;
        $scope.method = "PUT";
        $scope.id = topic.id;
    };
    var render = function() {
        $http.get('/topics')
            .then(function (res) {
                $scope.topics = res.data;
            })
            .catch(function (err) {
                console.error(err);
            })
    };
    render();

}


angular
    .module('App', [])
    .controller('first', firstController);

function firstController($scope, $http) {
    $scope.hello = 'hi';
    $scope.topic = {};
    $scope.topic.numberOfLikes = 0;
    $scope.popup = false;

    $scope.post = function (topic) {
        $http.post('/topics', topic).then(function () {

            $scope.topic = {};
            $scope.topic.numberOfLikes = 0;
            console.log($scope.topic.numberOfLikes);
            getTopics();
        });
    }

    $scope.edit = function (topic) {
        $scope.popup = true;
        $scope.topic = angular.extend({}, topic);
        return;
        getTopics();

    };

    $scope.delete = function (topic) {

        $http.delete('/topics/' + topic.id).then(function () {
            getTopics();

        });
    };

    $scope.saveLikes = function (topic) {
        if (topic.numberOfLikes == null) {
            topic.numberOfLikes = 1
        } else {
            topic.numberOfLikes += 1;
        }
        console.log(topic.numberOfLikes);
        return $http.put('/topics/' + topic.id, topic);
    };

    $scope.save = function () {
        var promise = null;
        if ($scope.topic.id) {
            promise = $http.put('/topics/' + $scope.topic.id, $scope.topic);
        } else {
            promise = $http.post('/topics', $scope.topic);
        }
        return promise.then(function () {
            $scope.popup = false;
            return getTopics();

        });
    }

    function getTopics() {
        $http({
            method: 'GET',
            url: '/topics'
        }).then(function (response) {
            console.log(response);
            $scope.response = response.data;
        }, function (response) {

        });
    }

    getTopics();
}


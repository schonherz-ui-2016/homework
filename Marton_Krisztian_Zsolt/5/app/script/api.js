
var apiService = function ($http) {
    this.deleteTop = function (id) {
        return $http.delete('/topics/' + id);
    };

    this.addTopic = function (topic) {
        return $http.post('/topics', topic);
    };

    this.editTopic = function(topic) {
        return $http.put('/topics/' + topic.id, topic);
    };

    this.getTopic = function () {
        return $http.get('/topics');
    }
};

angular.module('newmod').service('api', apiService);

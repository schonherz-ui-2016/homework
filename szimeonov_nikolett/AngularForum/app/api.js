angular
    .module('App')
    .service('api', Service);

function Service($http) {
    this.deleteTopic = function (id) {
        return $http.delete('/topics/' + id);
    };

    this.newTopic = function (topic) {
        return $http.post('/topics', topic);
    };

    this.editTopic = function (topic) {
        return $http.put('/topics/' + topic.id, topic);
    };

    this.getTopics = function () {
        return $http.get('/topics');
    };
};


/**
 * @param {Object} $http A http service
 */

var apiService = function ($http) {

    /**
     * @param {Number} id
     * @returns {Promise.<Object>}
     */

    this.deleteTopic = function (id) {
        return $http.delete('/topics/' + id);
    };

    /**
     * @param {Object} topic
     * @returns {Promise.<Object>}
     */

    this.editTopic = function (topic) {
        return $http.put('/topics/' + topic.id, topic);
    };

    /**
     * @param {Object} topic
     * @returns {Promise.<Object>}
     */

    this.newTopic = function (topic) {
        return $http.post('/topics', topic);
    };

    /**
     * @returns {Promise.<Array.<Object>>}
     */
    this.getTopics = function () {
        return $http.get('/topics');
    }
};

angular.module('myModule').service('api', apiService);
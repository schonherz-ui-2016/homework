/**
 * Created by Moni on 2016.11.28..
 */

/**
 * @param $http A http service
 */

var apiService = function ($http) {
    /**
     * @param {Number} id
     * @returns {Promise.<Object>}
     */
    this.deleteTopic = function (id) {
        return $http({
            method: 'DELETE',
            url: '/topics/' + id
        });
    };
    /**
     * @param {Object} topic
     * @returns {Promise.<Object>}
     */
    this.editTopic = function (topic) {
        return $http({
          method:'PUT',
          url: '/topics/' + topic.id,
          data: topic
        });
    };
    /**
     * @param {Object} topic
     * @returns {Promise.<Object>}
     */
    this.newTopic = function (topic) {
        return $http({
            method: 'POST',
            url: '/topics',
            data: topic
        });
    };
    /**
     * @returns {Promise.<Array.<Object>>}
     */
    this.getTopic = function () {
        return $http.get('/topics');
    };
};


angular.module('Forumtop').service('api', apiService);


/**
 * Created by Gaben on 2016.11.28..
 */
angular
    .module('app')
    .service('api', Service);

function Service($http) {
    var urlBase = '/topics';
    this.deleteTopic = deleteTopic;
    this.editTopic = editTopic;
    this.getTopic = getTopic;
    this.getTopics = getTopics;

    this.voteTopic = voteTopic;

    this.newTopic = newTopic;

    function deleteTopic(id) {
        return $http.delete(urlBase + '/' + id);
    }

    function editTopic(topic) {
        return $http.put(urlBase + '/' + topic.id, topic);
    }

    function getTopic(id) {
        return $http.get(urlBase + '/' + id);
    }

    function getTopics() {
        return $http.get(urlBase);
    }


    function voteTopic(topic){
        return $http.put(urlBase + '/' + topic.id, topic);
    }


    function newTopic(topic) {
        return $http.post(urlBase, topic);
    }

}
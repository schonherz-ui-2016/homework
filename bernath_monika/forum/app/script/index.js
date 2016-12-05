/**
 * Created by Moni on 2016.11.26..
 */

angular
    .module('Forumtop', [])
    .controller('first', First);

function First($scope, api) {
    $scope.hello = 'hi';
    $scope.add = function () {
        $scope.value = true;
        $scope.new = {};
        $scope.method = "POST";
        $scope.new.numberOfVote = 0;
    };
    $scope.newpost = function () {
        var a = {};
        if($scope.method == "POST"){
            a = api.newTopic($scope.new);
        } else{
            a = api.editTopic($scope.new);
        }
        console.log(a);
        a.then(function () {
            render();
            $scope.value = false;
            console.log($scope.new.numberOfVote);
        })
    };
    $scope.delete = function (id) {
        console.log(id);
        var a = api.deleteTopic(id);
        a.then(function(){
            render();
        });
    };
    $scope.edit = function (topic) {
        $scope.new = topic;
        $scope.value = true;
        $scope.method = "PUT";
        $scope.id = topic.id;
        console.log($scope.id)
    };
    $scope.vote = function (topic) {
        topic.numberOfVote++;
        console.log(topic.numberOfVote);
        api.editTopic(topic);
    };
    var render = function() {
        api.getTopic()
            .then(function (res) {
                $scope.topics = res.data;
                console.log(res.data);
            })
            .catch(function (err) {
                console.error(err);
            })
    };
    render();

}


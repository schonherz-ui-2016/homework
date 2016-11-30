/**
 * Created by Sa on 2016.11.28..
 */
angular.module('myApp').service('api', apiService)
    .directive('topic',function () {
        return{

            restrict: 'A',
            templateUrl:'template/topic.html',
            // link: /*..*/ ,
            scope: {
                topic: '&',// igy egy függvény, = objektum!
                openTopic: '=',
                topicDelete: '=',
                likeCount: '='

            }
        }
    });

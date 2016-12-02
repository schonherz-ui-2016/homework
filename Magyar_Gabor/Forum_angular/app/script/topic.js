/**
 * Created by Gaben on 2016.11.28..
 */
angular.module('app')
    .service('api', Service)
    .directive('topic', function () {
       return {
           restrict: 'A',
           templateUrl: './template/topicTemplate.html',
           scope: {
               topic: '&',
               onEdit: '<',
               onDelete: '<',
               onVote: '='
           }
       };
    });
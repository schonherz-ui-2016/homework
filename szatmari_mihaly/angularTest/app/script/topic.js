angular
    .module('myModule')
    .directive('topic', function() {
        return {
            restrict: 'A',
            templateUrl: 'template/topic.html',
            scope: {
                topic: '&',
                onEdit: '<',
                onDelete: '<',
                onLike: '<',
                onDislike: '<'
            }
        };
    } );
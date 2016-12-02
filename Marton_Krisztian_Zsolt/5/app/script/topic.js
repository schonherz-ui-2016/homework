angular
    .module('newmod')
    .directive('topic', function () {
        return {
            restrict: 'A',
            templateUrl: 'template/topic.html',
            scope: {
                topic: '&',
                onEdit: '<',
                onDelete: '<',
                onInc: '<',
                onDec: '<'
            }
        }
    });
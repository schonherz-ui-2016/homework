angular.module('Forumtop').directive('topic', function () {
    return {
        restrict: 'A',
        templateUrl: 'template/topic.html',
        scope: {
            topic: '&',
            onEdit: '<',
            onDelete: '<',
            onVote: '='
        },
    }
});

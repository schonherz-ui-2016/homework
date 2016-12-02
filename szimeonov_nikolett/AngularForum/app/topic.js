angular
    .module('App')
    .directive('topic', function () {
        return {
            templateUrl: 'template/topic.html',
            scope: {
                topic: '<',
                edit: '&',
                delete: '&',
                saveLikes: '='
            }
        };

    });
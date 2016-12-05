angular
    .module('myModule',[])
    .controller('myController', first);

function first($scope, api) {

    function activate() {
        refresh();
    }

    function refresh() {
        api.getTopics()
            .then(function (response) {
                console.log(response);
                $scope.topics = response.data;
            }).catch(function (response) {
            console.error(response);
        });
    }

    function addTopic() {
        console.log($scope.newTopic);
        $scope.popUpVisible = false;
        if ($('#title').val() == "" || $('#text').val() == "") {
            $('#warning').show();
            $scope.popUpVisible = true;
        } else {
            if ($scope.newTopic.id) {
                api.editTopic($scope.newTopic)
                    .then(
                        function () {
                            refresh();
                        },
                        function () {
                            console.log('Sikertelen szerkesztés!');
                        }
                    );
            } else {
                $scope.newTopic.votes = 0;
                $scope.newTopic.created = new Date().toString().slice(0, 24);
                api.newTopic($scope.newTopic)
                    .then(function () {
                        refresh();
                    })
                    .catch(function () {
                        console.error('Sikertelen feltöltés!');
                    })
            }

        }

    }

    activate();

    $scope.openPopup = function () {
        $('#warning').hide();
        $scope.popUpVisible = true;
        $scope.newTopic = {category: "General"};
    };

    $scope.addTopic = addTopic;

    $scope.delete = function (topicId) {
        api.deleteTopic(topicId)
            .then(
                function () {
                    refresh();

                },
                function () {
                    console.log('Sikertelen törlés!');
                }
            );
    };

    $scope.popUpVisible = false;

    $scope.edit = function (topic) {
        $scope.popUpVisible = true;
        $scope.newTopic = topic;
        $('#warning').hide();
    };

    $scope.cancel = function () {
        $scope.popUpVisible = false;
        $('#warning').hide();
    };

    $scope.like = function (topic) {
        topic.votes = topic.votes + 1;
        api.editTopic(topic);

    };

    $scope.dislike = function (topic) {
        topic.votes = topic.votes - 1;
        api.editTopic(topic);

    };

    /* $scope.alertBoxVisible = false;

    $scope.warning = function (topicId) {
        $scope.alertBoxVisible = true;
        if($scope.alertBoxVisible == false) {
            api.deleteTopic(topicId)
                .then(
                    function () {
                        refresh();

                    },
                    function () {
                        console.log('Sikertelen törlés!');
                    }
                );
        }
    };

    $scope.hide = function () {
        $scope.alertBoxVisible = false;
    }; */
}
angular
    .module('newmod', [])
    .controller('first', First)

    function First($scope, api) {
        refresh();
        
        $scope.deletetop = function(id) {
            api.deleteTop(id)
                .then(refresh)
        };

        $scope.vote= 0;
        $scope.addTopic = addTopic;
        $scope.newTopic = {};
        activate();

        function activate() {
            refresh();
        }

        function addTopic() {
            api.addTopic(topic)
                .then(function () {
                    refresh();
                    $scope.newTopic = {};
                })
                .catch(function () {
                    console.error('Elcseszted');
                });
        }

        $scope.modifytop = function(topic) {
            $scope.popupVisible = true;
            $scope.topic = topic;
        }

        $scope.sendtopic = function () {
            var result = null;
            if ($scope.topic.id){
                result = api.editTopic($scope.topic);
            } else {
                result = api.addTopic($scope.topic);
            }
            result.then(function () {
                refresh();
                $scope.popupVisible = false;
            });
        }

        $scope.incrementer = function (topic) {
            topic.vote++;
            api.editTopic(topic);
            refresh();
        }

        $scope.decrementer = function (topic) {
            topic.vote--;
            api.editTopic(topic);
            refresh();
        }

        function refresh() {
            api.getTopic()
                .then(function(response) {
                console.log(response);
                $scope.topics = response.data;
            }).catch(function(response) {
                console.error(response);
            });
        }
    }


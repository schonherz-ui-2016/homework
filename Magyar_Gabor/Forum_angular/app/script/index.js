/**
 * Created by Gaben on 2016.11.26..
 */
(function() {

    angular.module('app', [])
        .controller('myController', function ($scope, api){

            refresh();

            $scope.popupShow = function (){
                $scope.isVisible = true;
            };

            $scope.popupHide = function (){
                $scope.isVisible = false;
            };

            $scope.addNew = function (){
                var x;
                var newObject = {};
                var modifiedObject = {};
                console.log(newObject);
                if($scope.method == "POST"){
                    if ($scope.newCategory == ""){
                        $scope.newCategory = "no category";
                    }
                    newObject = {
                        title: $scope.newTitle,
                        category: $scope.newCategory,
                        brief: $scope.newBrief,
                        created: new Date(),
                        views: 0,
                        replies: 0,
                        votes: 0,
                        last_view: '',
                        last_comment: ''
                    };
                    x = api.newTopic(newObject)
                }
                else {
                    if ($scope.newCategory == ""){
                        $scope.newCategory = "no category";
                    }
                    modifiedObject = {
                        id: $scope.index,
                        title: $scope.newTitle,
                        category: $scope.newCategory,
                        brief: $scope.newBrief,
                        created: new Date(),
                        views: $scope.views,
                        replies: $scope.replies,
                        votes: $scope.votes,
                        last_view: $scope.last_view,
                        last_comment: $scope.last_comment
                    };
                    x = api.editTopic(modifiedObject)
                }
                x.then(function (){
                    $scope.popupHide();
                    refresh();
                })
            };

            $scope.removeTopic = function (id){
                 api.deleteTopic(id)
                     .then(function (){
                         refresh();
                     })
            };

            $scope.editTopic = function (id){
              $scope.popupShow();
              $scope.index = id;
              $scope.method = "PUT";
              api.getTopic(id)
                  .then(function(response){
                      //console.log(response);
                      $scope.newTitle = response.data.title;
                      $scope.newCategory = response.data.category;
                      $scope.newBrief = response.data.brief;
                      $scope.views = response.data.views;
                      $scope.replies = response.data.replies;
                      $scope.likes = response.data.likes;
                      $scope.last_view = response.data.last_view;
                      $scope.last_comment = response.data.last_comment;
                  })
                  .catch(function (error){
                      console.error(error);
                  })
            };

            $scope.voteTopic = function (id){
                $scope.method="PUT";
                api.getTopic(id)
                    .then(function(response){
                        if(!response.data.hasOwnProperty('votes')){
                            response.data.votes = 1;
                        }
                        else {
                            response.data.votes++;
                        }
                        api.editTopic(response.data)
                            .then(function (){
                                refresh();
                            })
                            .catch(function (error){
                                console.error(error);
                            });
                    }).catch(function (error){
                    console.error(error);
                });

            };

            function refresh() {
                api.getTopics()
                    .then(function (response){
                        //console.log(response.data);
                        $scope.topics = response.data;

                        var c = [], n = [], p = [];
                        $scope.categories = [];
                        var i, j;
                        $scope.replies = 0;
                        for (i = 0; i < $scope.topics.length; i++){
                            c.push($scope.topics[i].category.toLowerCase());
                            $scope.replies += parseInt($scope.topics[i].replies);
                        }
                        c.sort();
                        n.push(c[0]);
                        p.push(0);
                        for (i = 1; i < c.length; i++){
                            if(c[i] != c[i - 1]){
                                n.push(c[i]);
                                p.push(0);
                            }
                        }
                        for (i = 0; i < n.length; i++){
                            for(j = 0; j < c.length; j++){
                                if(n[i] == c[j]){
                                    p[i]++;
                                }
                            }
                        }
                        for(i = 0; i < n.length; i++){
                            $scope.categories.push({
                                name: n[i],
                                piece: p[i]
                            });
                        }

                    })
                    .catch(function (error){
                        console.error(error);
                    });
                $scope.newTitle = "";
                $scope.newCategory = "";
                $scope.newBrief = "";
                $scope.index = null;
                $scope.method = "POST";
                $scope.isVisible = false;
            }
        });
})();

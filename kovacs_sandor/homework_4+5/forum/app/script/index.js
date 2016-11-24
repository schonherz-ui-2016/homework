/**
 * Created by Sa on 2016.11.25..
 */
/**
 * Created by Sa on 2016.11.16..
 */
var data = {
    topics: [
        // {
        //     title:'Quote of the day',
        //     created: '09 10 2015 11:52:11 GMT+0100',
        //     category: 'General',
        //     brief: 'Work hard for what you want because it wont come to you without a fight. You have to be strong and courageous and know...',
        //     views:10,
        //     replay:1,
        //     leftTime:0,
        //     lastReplay:'09 11 2015 11:52:11 GMT+0100'
        // }, {
        //     title:'lorum ipsum test by member',
        //     created: '09 09 2015 11:45 AM GMT+0100',
        //     category: 'General',
        //     brief: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque habitant morbi...',
        //     views:4,
        //     replay:1,
        //     lastReplay:'09 10 2015 11:45 AM GMT+0100'
        // }, {
        //     title:'kitchen sink test',
        //     created: '09 09 2015 11:40 AM GMT+0100',
        //     category: 'General',
        //     brief: 'This thread is to test the html tags and other related data',
        //     views:3,
        //     replay:1,
        //     lastReplay:'09 10 2015 11:40 AM GMT+0100'
        // }, {
        //     title:'food facts of plusealth',
        //     created: '09 09 2015 11:31 AM GMT+0100',
        //     category: 'Pictures',
        //     brief: 'Food facts of plusHealth.com',
        //     views:21,
        //     replay:1,
        //     lastReplay:'09 10 2015 11:31 AM GMT+0100'
        // }, {
        //     title:'beatuiful videos',
        //     created: '08 10 2015 18:29 AM GMT+0100',
        //     category: 'Videos',
        //     brief: 'The Most Beautiful Videos, That May Make You Cry',
        //     views:2,
        //     replay:1,
        //     lastReplay:'08 11 2015 18:29 AM GMT+0100'
        // }, {
        //     title:'man vs lion',
        //     created: '08 10 2015 18:20 AM GMT+0100',
        //     category: 'Videos',
        //     brief: 'This is test video thread. The video id from youtube and the relative author contains the rights.',
        //     views:2,
        //     replay:1,
        //     lastReplay:'08 11 2015 18:29 AM GMT+0100'
        // },
    ]
};

modalSee();

var $template = $('.template');

function render(response) {
    $('#leftMain').html('');

    response.forEach((topic)=> {
        var $topic = $template.clone();
        var leftTimeCount = Math.floor((new Date() - new Date(topic.created)) / 1000 / 60);
        if (leftTimeCount > 60) {
            leftTimeCount = Math.floor((new Date() - new Date(topic.created)) / 1000 / 60 / 60);
            $topic.find('.leftTimeUnit').html(" Hours"); //.css('color','blue'); :-)
            // document.getElementsByClassName("leftTimeUnit").innerHTML=" Hours";
            if (leftTimeCount > 24) {
                leftTimeCount = Math.floor((new Date() - new Date(topic.created)) / 1000 / 60 / 60 / 24);
                $topic.find('.leftTimeUnit').html(" Days");
            }
        }
        $topic.removeClass('template');
        $topic.find('.titleArticle').html(topic.title);
        $topic.find('.created').html(topic.created);
        $topic.find('.category').html(topic.category);
        $topic.find('.brief').html(topic.brief);
        $topic.find('.views').html(topic.views);
        $topic.find('.replay').html(topic.replay);
        $topic.find('.leftTime').html(leftTimeCount);
        $topic.find('.lastReplay').html(topic.lastReplay);
        $topic.find('.deleteTopic').data('id', topic.id);
        $topic.find('.modButton').data('id', topic.id);
        $('#leftMain').append($topic);
    });
}

function modalSee() {
    $(document).on('click', '.buttonModal', function () {
        $(".modal").css('display', 'block');
    });
};


var searchId = 0;

function modModalSee() {
    $(document).on('click', '.modButton', function (event) {
        event.preventDefault();
        searchId = $(this).data('id');
        searchView = $(this).data('view');
        console.log("searchId:")
        console.log(searchId);
        $.get('./topics').then(function (response3) {
            response3.forEach((topic)=> {
                if (topic.id == searchId) {
                    $('#modTitleInput').val(topic.title);
                    $('#modCategory').val(topic.category);
                    $('#modBrief').val(topic.brief);
                }
            })
        });

        $(".modModal").css('display', 'block');
    });
};
modModalSee();
function sendNewTopic(response) {
    $(document).on('click', '#submit', function (event) {
        event.preventDefault();
        var send = {
            title: $('#newTopic').find('#titleInput').val(),
            created: new Date(),
            category: $('#newTopic').find('#category').val(),
            brief: $('#newTopic').find('#brief').val(),
            views: 0,
            replay: 0,
            leftTime: 0,
            lastReplay: 0
        };
        $.ajax({
            method: "POST",
            url: "/topics",
            data: JSON.stringify(send),
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8'
        })
            .then(function (resp) {
                console.log("resp:")
                console.log(resp);
            })
            .catch(function (error) {
                console.error(error);
            });

        response.push(send);

        render(response);
        $(".modal").css('display', 'none');

    });
}

function writeToConsole(response2) {

    console.log(response2);
}

function deleteActTopic() {
    $(document).on('click', '.deleteTopic', function (event) {
        event.preventDefault();
        var id = $(this).data('id');
        console.log("id:")
        console.log(id);
        $.ajax({
            method: 'DELETE',
            url: '/topics/' + id
        }).then(function () {// thennel akkor fut le, amikor az az előtte lévő lefutott
            console.log("id:")
            console.log(id);
            $.get('./topics').then(function (response2) {
                writeToConsole(response2);
                render(response2);
            });
        });
    })
}
deleteActTopic();

function modTopic() {
    $(document).on('click', '#modSubmit', function (event) {
        event.preventDefault();

        var views2 = 0;
        var replay2 = 0;
        var lastReplay2 = 0;

        $.get('./topics').then(function (response3) {
            response3.forEach((topic)=> {
                if (topic.id == searchId) {
                    views2 = topic.views;
                    replay2 = topic.replay;
                    lastReplay2 = topic.lastReplay;
                }
            });
        })

        var send = {
            title: $('#modTopic').find('#modTitleInput').val(),
            created: new Date(),
            category: $('#modTopic').find('#modCategory').val(),
            brief: $('#modTopic').find('#modBrief').val(),
            views: views2,
            replay: replay2,
            leftTime: 0,
            lastReplay: lastReplay2,
            id: searchId
        };
        console.log("searchView:");
        console.log(searchView);
        $.ajax({
            method: 'PUT',
            url: '/topics/' + searchId,
            data: JSON.stringify(send),
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8'
        })
            .then(function (response) {
                console.log("response:")
                console.log(response);
                console.log("searchId:")
                console.log(searchId);
                $.get('./topics').then(function (response2) {
                    writeToConsole(response2);
                    render(response2);
                });
            })
            .catch(function (error) {
                console.error(error);
            });
        $(".modModal").css('display', 'none');
    });


};

modTopic();
$.get('./topics').then(function (response2) {
    writeToConsole(response2);
    render(response2);
    sendNewTopic(response2);
});

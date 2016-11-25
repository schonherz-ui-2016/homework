/**
 * Created by Gaben on 2016.11.12..
 */
var data = {
    topics: [
        {
            id: 1,
            title: 'quote of the day',
            created: '09/10/2015 11:45 AM',
            category: 'General',
            brief: 'Work hard for what you want because it won\'t come to you without a fight. You have to be strong and courageous and know...',
            views: '10',
            replies: '1',
            last_view: '',
            last_comment: ''
        },
        {
            id: 2,
            title: 'lorum ipsum test by member',
            created: '09/10/2015 11:45 AM',
            category: 'General',
            brief: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque habitant morbi...',
            views: '4',
            replies: '1',
            last_view: '',
            last_comment: ''
        },
        {
            id: 3,
            title: 'kitchen sink test',
            created: '09/10/2015 11:40 AM',
            category: 'General',
            brief: 'This tread is to test the html tags and other related data',
            views: '3',
            replies: '1',
            last_view: '',
            last_comment: ''
        },
        {
            id: 4,
            title: 'food facts of plusealth',
            created: '09/10/2015 11:31 AM',
            category: 'Pictures',
            brief: 'Food facts of plusHealth.com',
            views: '21',
            replies: '1',
            last_view: '',
            last_comment: ''
        },
        {
            id: 5,
            title: 'beautiful videos',
            created: '09/10/2015 06:29 AM',
            category: 'Videos',
            brief: 'The Most Beautiful Videos. That Make You Cry',
            views: '2',
            replies: '1',
            last_view: '',
            last_comment: ''
        },
        {
            id: 6,
            title: 'man vs lion',
            created: '09/10/2015 06:20 AM',
            category: 'Videos',
            brief: 'This is test video thread. The video is from youtube and the relative author contains the rights.',
            views: '4',
            replies: '1',
            last_view: '',
            last_comment: ''
        }
    ]
};

$.get('/topics').done(function (response){
    render(response);
});

var $template = $('.template');

function render(arr) {
    $('#topics').html("");
    arr.forEach(function (topic) {
        var $topic = $template.clone();
        $topic.removeClass('template');
        $topic.find('.delete').data('id', topic.id);
        $topic.find('.modify').data('id', topic.id);
        $topic.find('.title').html(topic.title);
        $topic.find('.created').html(topic.created);
        $topic.find('.category').html(topic.category);
        $topic.find('.brief').html(topic.brief);
        $topic.find('.views').html(topic.views + " Views");
        $topic.find('.replies').html(topic.replies + " Reply");
        $topic.find('.last_view').html(topic.last_view + " Minutes");
        $topic.find('.last_comment').html(topic.last_view + " Minutes");
        $('#topics').append($topic);
    });
}

//Add new topic
$('#new').on('click', function(){
    $('#popup-new').css('display', 'block');
});

$('#ok').on('click', function(){
    $('#popup-new').css('display', 'none');
    var newObject = {
        title: $('#new_title').val(),
        created: new Date(),
        category: $('#new_category').val(),
        brief: $('#new_brief').val(),
        views: '0',
        replies: '0',
        last_view: '',
        last_comment: ''
    };

    $.ajax({
        method: "POST",
        url: "/topics",
        data: JSON.stringify(newObject),
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8'
    })
        .then(function(resp) {
            console.log(resp);
            $.get('/topics').done(function (response){
                render(response);
            });
        })
        .catch(function(error) {
            console.error(error);
        });
});

//Delete topic
$(document).on('click', '.delete', function(){
    var id = $(this).data('id');
    console.log(id);
    $.ajax({
        method: 'DELETE',
        url: "topics/" + id
    })
        .then(function(resp) {
            console.log(resp);
            $.get('/topics').done(function (response){
                render(response);
            });
        })
        .catch(function(error) {
            console.error(error);
        });
});

//Modify topic
$(document).on('click', '.modify', function(){
    var index = ($(this).data('id'));
    console.log(index);
    $.ajax({
        method: 'GET',
        url: "topics/" + index
    })
        .then(function(resp) {
            console.log(resp);
            $('#popup-modify').css('display', 'block');
            $('#mod_title').val(resp.title);
            $('#mod_category').val(resp.category);
            $('#mod_brief').val(resp.brief);
        })
        .catch(function(error){
            console.error(error);
        });

    $('#modify').on('click', function (){
        $('#popup-modify').css('display', 'none');
        var modifiedObject = {
            title: $('#mod_title').val(),
            created: new Date(),
            category: $('#mod_category').val(),
            brief: $('#mod_brief').val(),
            views: '0',
            replies: '0',
            last_view: '',
            last_comment: ''
        };
        console.log(modifiedObject);
        $.ajax({
            method: "PUT",
            url: "/topics/" + index,
            data: JSON.stringify(modifiedObject),
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8'
        })
            .then(function(resp) {
                console.log(resp);
                $.get('/topics').done(function (response){
                    render(response);
                });
            })
            .catch(function(error) {
                console.error(error);
            });
    });

});









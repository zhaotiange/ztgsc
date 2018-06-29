define([
    'jquery',
    'temp',
    'getUrl',
    'base64'
], function($, temp, getUrl) {
    var storage = window.localStorage;
    // 默认显示第一章
    var chapterId = getUrl('curchapter') || storage.getItem('chapterId') * 1 || 1;
    var fontSize = storage.getItem('fontSize') || 16;
    $('.content p').css('fontSize', fontSize * 1);
    var bgColor = ['#fff', '#000', 'skyblue', 'orange'];
    getText();
    // 获取总章节
    var chaptersum = getUrl('chaptersum');
    $('.sum').html(chaptersum);

    // 点击下一章
    $('.next_btn').on('click', function() {
        chapterId++;
        chapterId = chapterId >= chaptersum ? chaptersum : chapterId;
        getText();
        return false;
    });
    // 点击上一章
    $('.prev_btn').on('click', function() {
        chapterId--;
        chapterId = chapterId <= 1 ? 1 : chapterId;
        getText();
        return false;
    });


    function getText() {
        $.ajax({
            url: '/api/reader',
            data: {
                chapterNum: chapterId
            },
            dataType: 'json',
            success: function(data) {
                $('.cur').html(chapterId);
                jsonp(data.jsonp, function(data) {
                    var data = JSON.parse($.base64().decode(data));
                    temp($('.text').html(), data, '.content');
                })
            }
        })
    }

    function jsonp(url, success) {
        var script = document.createElement('script');
        window['duokan_fiction_chapter'] = function(data) {
            success(data);
            document.head.removeChild(script);
        }
        script.src = url;
        document.head.appendChild(script);
    }
});
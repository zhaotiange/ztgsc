define(['jquery', 'temp', 'getUrl'], function($, temp, getUrl) {
    var storage = window.localStorage;
    var bookid = getUrl('id');
    var activeid = getUrl('active');
    $.ajax({
        url: '/api/chapter',
        data: {
            id: bookid
        },
        dataType: 'json',
        success: function(data) {
            data.item.toc.map(function(v) {
                v.chapter_id == activeid ? v.active = true : v.active = false;
            });
            temp($('.text').html(), data.item.toc, '.list');
            scrolls(data.item.toc.length);
        }
    })

    function scrolls(n) {
        $('.main').scrollTop($('li.active').position());
        $('.list li').on('click', function() {
            if (storage.getItem('userInfo')) {
                window.location.href = "text.html?id=" + bookid + '&chaptersum=' + n + '&curchapter=' + $(this).index();
            } else {
                alert('请先登录');
                window.location.href = "login.html";
            }
        })
    }
});
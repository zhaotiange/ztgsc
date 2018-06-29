define([
    'jquery',
    'temp',
    'text!template/dl_list.html'
], function($, temp, dltext) {
    // 历史记录
    var storage = window.localStorage;
    var searchdata = JSON.parse(storage.getItem('searchinfo')) || [];
    searchinfo();
    $.getJSON('/api/searchKey').done(render);

    function render(data) {
        temp($('.text').html(), data, '.search_cont')
    };


    $('.btn').on('click', function() {
        var inp = $(this).prev();
        var val = inp.val();
        if (val != '') {
            searchdata.unshift(val);
            storage.setItem('searchinfo', JSON.stringify(searchdata));
            searchinfo()
            $.getJSON('/api/result', { value: val }, function(data) {



                if (data.mes == 'success') {
                    temp(dltext, data.cont, '.search_cont')
                } else {
                    $('.search_cont').html(data.mes);
                }
            })
        }
    });

    function searchinfo() {
        temp($('.remove').html(), searchdata, '.history_list');
    }

});
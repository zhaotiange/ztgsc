define(['jquery'], function($) {
    var storage = window.localStorage;
    //当两个btn点击时
    $('button').on('click', function() {
        var user = $('.text').val().trim();
        var pwd = $('.pwd').val().trim();
        var errorMes = '';
        //判断 两个输入框是否为空   为空报错  不空的话进行判断
        if (user == '' || pwd == '') {
            errorMes = '用户名或密码不能为空';
        } else {
            var phone = /^1[34578]\d{9}$/;
            var email = /^\w+@\w+\.[com|cn|net]$/;
            //判断用户名格式是否正确 不正确输出报错信息
            if (!(phone.test(user) || email.test(user))) {
                errorMes = 'ERROR';
            }
            var pwdreg = /[^a-z0-9]/i;
            //判断密码是否正确 判断长度是否符合要求
            if (pwdreg.test(pwd) || pwd.length < 5 || pwd.length > 10) {
                errorMes = 'ERROR';
            } else {
                //判断是否是纯数字或者纯字母
                var numreg = /^\d{5,10}$/;
                var codereg = /^[a-z]{5,10}$/i;
                //如果是纯数字或者字母  则报错
                if (numreg.test(pwd) || codereg.test(pwd)) {
                    errorMes = 'ERROR';
                }
            }
        };
        if (errorMes) {
            $('.tip').html(errorMes);
        } else {
            //登录发送密码
            if ($(this).hasClass('log')) {
                //发送密码
                $.ajax({
                    url: '/api/login',
                    type: 'post',
                    data: {
                        user: user,
                        pwd: pwd
                    },
                    dataType: 'json',
                    success: function(data) {
                        if (data.code) {
                            history.go(-1);
                            storage.setItem('userInfo', 1)
                        } else {
                            alert(data.mes);
                        }
                    }
                })
            } else {
                // 注册
                $.ajax({
                    url: '/api/reglogin',
                    type: 'post',
                    data: {
                        user: user,
                        pwd: pwd
                    },
                    dataType: 'json',
                    success: function(data) {
                        if (data.code) {
                            alert('注册成功')
                        }
                    }
                })
            }
        }
    });
    $('.eye').on('click', function() {
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $('.pwd').attr('type', 'text')
        } else {
            $('.pwd').attr('type', 'password')
        }
    })
});
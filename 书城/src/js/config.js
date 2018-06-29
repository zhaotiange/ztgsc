require.config({
    baseUrl: '/js/',
    paths: {
        jquery: 'lib/jquery',
        zepto: 'lib/zepto',
        index: 'index/index',
        text: 'lib/require.text',
        template: '../template/',
        handlebars: 'lib/handlebars',
        temp: 'common/temp',
        swiper: 'lib/swiper',
        search: 'search/index',
        detail: 'detail/index',
        getUrl: 'common/getUrl',
        menu: 'menu/index',
        texts: 'texts/index',
        base64: 'lib/jquery.base64',
        login: 'login/index'
    },
    shim: {
        base64: {
            exports: 'base64',
            deps: ['jquery']
        }
    }
})
var gulp = require('gulp');
var server = require('gulp-webserver');
var url = require('url');
var path = require('path');
var fs = require('fs');
var mock = require('./mock/');
var userData = require('./mock/user/user').userInfo;
var gScss = require('gulp-sass');
var miniCss = require('gulp-clean-css');
var miniHtml = require('gulp-htmlmin');
gulp.task('minicss', function() {
    gulp.src('./src/css/*.css')
        .pipe(miniCss())
        .pipe(gulp.dest('./dest/css/'));
});



gulp.task('miniH', function() {
        gulp.src('./src/page/*.html')
            .pipe(miniHtml({
                collapseWhitespace: true,
                minifyJS: true,
                minifyCSS: true
            }))
            .pipe(gulp.dest('./dest/page/'))
    })
    //scss
gulp.task('scss', function() {
    return gulp.src('./src/css/*.scss')
        .pipe(gScss())
        .pipe(gulp.dest('./dest/scss/'));
});

gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8888,
            host: 'localhost',
            open: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                pathname = pathname === '/' ? '/index.html' : pathname;
                if (req.url === '/favicon.ico') {
                    return false;
                };
                if (/\/api\//.test(pathname)) {
                    if (pathname === '/api/login' || pathname === '/api/reglogin') {
                        var data = [];
                        req.on('data', function(chunk) {
                            data.push(chunk)
                        });
                        req.on('end', function() {
                            var buf = Buffer.concat(data).toString();
                            buf = require('querystring').parse(buf);
                            if (pathname === '/api/login') {
                                var result = userData.some(function() {
                                    return userData.user == data.user && userData.pwd == data.pwd
                                });
                                if (result) {
                                    res.end('{"code":1,"mes":"登陆成功"}')
                                } else {
                                    res.end('{"code":1,"mes":"用户名或密码错误}')
                                }
                            } else {
                                userData.push(data);
                                var userObj = {
                                    userInfo: userdata
                                };
                                fs.writeFileSync('./mock/user/user.json', JSON.stringify(userObj));
                                res.end('{"code":1,"mes":"注册成功"}')
                            }
                        })
                        return false;
                    }
                    res.end(JSON.stringify(mock(req.url)));
                } else {
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
})

gulp.task('default', ['server', 'scss', 'minicss', 'miniH']);
function swallowImages() {
    var config = {
        src: {
            globs: 'images/*.{gif,png,jpg,jpeg,svg,ico}',
            options: {}
        },
        transform: {
            options: {},
            header: '',
            footer: ''
        },
        dest: {
            path: 'images',
            filename: 'images.js',
            header: 'module.exports = {\n',
            footer: '\n};\n',
            options: {}
        }
    };

    return gulp.src(config.src.globs, config.src.options)
        .pipe($$.imagine64(config.transform.options))
        .pipe($$.header(config.transform.header))
        .pipe($$.footer(config.transform.footer))
        .pipe($$.concat(config.dest.filename))
        .pipe($$.header(config.dest.header))
        .pipe($$.footer(config.dest.footer))
        .pipe(gulp.dest(config.dest.path, config.dest.options));
}
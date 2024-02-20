function less2css(themes, outputFilename){
    const themesources = themes.map(function(l){
        return 'src/themes/' + l + '.less';
    });
    
    // base is always required!
    return _gulp.src(['src/themes/core/base.less'].concat(themesources))
        .pipe(_prettyError())

        .pipe(_gulp_less())
        .pipe(_gulp_cleancss())
        .pipe(_concat(outputFilename + '.min.css'))

        // add license header
        .pipe(_header(licenseHeader))

        .pipe(_gulp.dest('dist'));
}
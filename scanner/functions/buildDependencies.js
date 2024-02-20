function buildDependencies() {
	return browserify()
		.require('string-mask', {
			expose: 'string-mask'
		})
		.require('date-fns/format', {
			expose: 'date-fns/format'
		})
		.require('date-fns/parse', {
			expose: 'date-fns/parse'
		})
		.require('date-fns/isValid', {
			expose: 'date-fns/isValid'
		})
		.require('br-validations', {
			expose: 'br-validations'
		})
		.bundle()
		.pipe(source('angular-input-masks-dependencies.js'))
		.pipe(buffer())
		.pipe(gulp.dest('./releases/'))
		.pipe(plugins.uglify())
		.pipe(
			plugins.rename({
				extname: '.min.js'
			})
		)
		.pipe(gulp.dest('./releases/'));
}
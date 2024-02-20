function getBumpTask(type) {
	return function () {
		return gulp.src(['./package.json', './bower.json'])
			.pipe(bump({ type: type }))
			.pipe(gulp.dest('./'));
	};
}
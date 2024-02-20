function tests() {
	return src("dist/rig.js")
		.pipe(rename("theorem.js"))
		.pipe(dest("__test__"));
}
function modern() {
	return src("dist/rig.js")
		.pipe(rename("theorem.js"))
		.pipe(dest("dist"));
}
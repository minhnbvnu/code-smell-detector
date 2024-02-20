function getAllLocales() {
	const LOCALE_FILE_NAME_REG_EXP = /([^\/]+)\.json$/
	return fs.readdirSync(path.join('./locale/'))
		.filter(_ => fs.statSync(path.join('./locale', _)).isFile() && LOCALE_FILE_NAME_REG_EXP.test(_))
		.map(_ => _.match(LOCALE_FILE_NAME_REG_EXP)[1])
}
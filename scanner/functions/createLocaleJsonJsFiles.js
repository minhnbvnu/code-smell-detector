function createLocaleJsonJsFiles(locales) {
	for (const locale of locales) {
		const localeData = readJsonFromFile(`./locale/${locale}.json`)
		fs.writeFileSync(`./locale/${locale}.json.js`, 'export default ' + JSON.stringify(localeData, null, 2), 'utf8')
	}
}
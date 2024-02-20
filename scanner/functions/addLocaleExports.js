function addLocaleExports(ALL_LOCALES) {
	// Read `package.json` file.
	const packageJson = readJsonFromFile('./package.json')

	// Remove all locale exports.
	for (const path of Object.keys(packageJson.exports)) {
		if (path.startsWith('./locale/')) {
			delete packageJson.exports[path]
		}
	}

	// Re-add all locale exports.
	packageJson.exports = {
		...packageJson.exports,
		...ALL_LOCALES.reduce((all, locale) => {
			all[`./locale/${locale}`] = {
      		types:  `./locale/${locale}.json.d.ts`,
				import: `./locale/${locale}.json.js`,
				require: `./locale/${locale}.json`
			}
			all[`./locale/${locale}.json`] = {
      		types:  `./locale/${locale}.json.d.ts`,
				import: `./locale/${locale}.json.js`,
				require: `./locale/${locale}.json`
			}
			return all
		}, {})
	}

	// Save `package.json` file.
	fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2) + '\n', 'utf8')
}
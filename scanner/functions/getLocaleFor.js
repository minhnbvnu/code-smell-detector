async function getLocaleFor(locale) {
	// IMPORTANT: Keep each '/moment/local/...' string as is. Otherwise, webpack might not bundle
	//            locale data because the contentRegExp fails to detect any files.
	try {
		// default load e.g. en-de
		await import(`moment/locale/${locale}.js`)
		return locale
	} catch (error) {
		const splitLocale = locale.split('-')
		try {
			// failure: fallback to first part of locale, which
			// should be language
			locale = splitLocale[0]
			await import(`moment/locale/${locale}.js`)
			return locale
		} catch (e) {
			// failure, fallback to english
			console.debug('Fallback to locale', 'en')
			// English is the default locale and doesn't need to imported.
			// It is already included in moment.js.
		}
	}

	return 'en'
}
async function loadMomentLocalization() {
	const locale = getLocale().replace('_', '-').toLowerCase()
	const language = getLanguage().replace('_', '-').toLowerCase()

	if (locale === language) {
		return getLocaleFor(locale)
	}

	const [realLocale, realLanguage] = await Promise.all([getLocaleFor(locale), getLocaleFor(language)])
	if (realLocale === realLanguage) {
		return realLocale
	}

	const name = `nextcloud-calendar-fake-locale-${realLocale}-${realLanguage}`
	moment.defineLocale(name, {
		parentLocale: realLanguage,
		longDateFormat: {
			LT: moment.localeData(realLocale).longDateFormat('LT'),
			LTS: moment.localeData(realLocale).longDateFormat('LTS'),
			L: moment.localeData(realLocale).longDateFormat('L'),
			LL: moment.localeData(realLocale).longDateFormat('LL'),
			LLL: moment.localeData(realLocale).longDateFormat('LLL'),
			LLLL: moment.localeData(realLocale).longDateFormat('LLLL'),
			l: moment.localeData(realLocale).longDateFormat('l'),
			ll: moment.localeData(realLocale).longDateFormat('ll'),
			lll: moment.localeData(realLocale).longDateFormat('lll'),
			llll: moment.localeData(realLocale).longDateFormat('llll'),
		},
		week: {
			dow: moment.localeData(realLocale).firstDayOfWeek(),
			doy: moment.localeData(realLocale).firstDayOfYear(),
		},
	})

	return name
}
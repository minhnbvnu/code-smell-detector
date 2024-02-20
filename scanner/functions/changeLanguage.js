function changeLanguage() {
	var lang = langs[langIndex++];
	moment.locale(lang);
	$.language.text = 'language: ' + lang;

	if (langIndex >= langs.length) { langIndex = 0; }
}
function getLanguageName(langCode) {
		return LANG_REPOSITORY.languageData ? LANG_REPOSITORY.languageData[langCode].name : langCode;
	}
function bindSpellCheck() {
	if (!store.get(userConfig.SPELL_CHECK_ENABLED, false)) {
		return;
	}

	window.spellCheckHandler = new SpellCheckHandler();
	window.spellCheckHandler.attachToInput();

	const userLocale = store.get(userConfig.SPELL_CHECK_LOCALE, '');
	const locale = userLocale === '' ? app.getLocale() : userLocale;
	window.spellCheckHandler.switchLanguage(locale);

	let contextMenuBuilder = new ContextMenuBuilder(window.spellCheckHandler);
	new ContextMenuListener((info) => {
		contextMenuBuilder.showPopupMenu(info);
	});
}
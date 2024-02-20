function bindUI() {
	// Dark mode
	bindCheckboxUI(DARK_MODE_ENABLED_CHECKBOX, userConfig.DARK_MODE_ENABLED);

	// Spell check
	bindCheckboxUI(SPELL_CHECK_ENABLED_CHECKBOX, userConfig.SPELL_CHECK_ENABLED);
	
	const localeSelectElem = document.querySelector(SPELL_CHECK_LOCALE_SELECT);
	localeSelectElem.addEventListener('change', () => {
		store.set(userConfig.SPELL_CHECK_LOCALE, localeSelectElem.value);
		loadSettingsToUI();
	});

	// Push notifications
	bindCheckboxUI(PUSH_NOTIFS_SHOW_UNREAD_BADGE_CHECKBOX, userConfig.PUSH_NOTIFICATIONS_SHOW_UNREAD_BADGE);
	bindCheckboxUI(PUSH_NOTIFS_HIDE_MESSAGE_BODY_CHECKBOX, userConfig.PUSH_NOTIFICATIONS_HIDE_MESSAGE_BODY);

	// Privacy
	bindCheckboxUI(PRIVACY_BLOCK_TYPING_INDICATOR_CHECKBOX, userConfig.PRIVACY_BLOCK_TYPING_INDICATOR);
	bindCheckboxUI(PRIVACY_BLOCK_SEEN_INDICATOR_CHECKBOX, userConfig.PRIVACY_BLOCK_SEEN_INDICATOR);

	// Advanced	
	const domainSelectElem = document.querySelector(DOMAIN_SELECT);
	domainSelectElem.addEventListener('change', () => {
		store.set(userConfig.DOMAIN, domainSelectElem.value);
		loadSettingsToUI();
	});

	bindCheckboxUI(COLLAPSE_SIDEBAR_CHECKBOX, userConfig.COLLAPSE_SIDEBAR);
}
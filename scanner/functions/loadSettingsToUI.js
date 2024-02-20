function loadSettingsToUI() {
	// Dark mode
	loadCheckboxSettingToUI(DARK_MODE_ENABLED_CHECKBOX, userConfig.DARK_MODE_ENABLED, false);

	// Spell check
	loadCheckboxSettingToUI(SPELL_CHECK_ENABLED_CHECKBOX, userConfig.SPELL_CHECK_ENABLED, false);

	const locale = store.get(userConfig.SPELL_CHECK_LOCALE, '');
	const localeSelectElem = document.querySelector(SPELL_CHECK_LOCALE_SELECT);

	let localeSelectedIndex = 0;
	for (let i = 0; i < localeSelectElem.options.length; i++) {
		const optionElem = localeSelectElem[i];
		if (optionElem.value === locale) {
			localeSelectedIndex = i;
			break;
		}
	}
	localeSelectElem.selectedIndex = localeSelectedIndex;

	// Push notifications
	loadCheckboxSettingToUI(PUSH_NOTIFS_SHOW_UNREAD_BADGE_CHECKBOX, userConfig.PUSH_NOTIFICATIONS_SHOW_UNREAD_BADGE, true);
	loadCheckboxSettingToUI(PUSH_NOTIFS_HIDE_MESSAGE_BODY_CHECKBOX, userConfig.PUSH_NOTIFICATIONS_HIDE_MESSAGE_BODY, false);

	// Privacy
	loadCheckboxSettingToUI(PRIVACY_BLOCK_TYPING_INDICATOR_CHECKBOX, userConfig.PRIVACY_BLOCK_TYPING_INDICATOR, false);
	loadCheckboxSettingToUI(PRIVACY_BLOCK_SEEN_INDICATOR_CHECKBOX, userConfig.PRIVACY_BLOCK_SEEN_INDICATOR, false);

	// Advanced
	const domain = store.get(userConfig.DOMAIN, userConfig.DEFAULT_DOMAIN);
	const domainSelectElem = document.querySelector(DOMAIN_SELECT);
	if (domain === userConfig.DEFAULT_DOMAIN) {
		domainSelectElem.selectedIndex = 0;
	} else {
		domainSelectElem.selectedIndex = 1;
	}
	
	loadCheckboxSettingToUI(COLLAPSE_SIDEBAR_CHECKBOX, userConfig.COLLAPSE_SIDEBAR, false);
}
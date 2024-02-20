function conversationAction(index, groupIndex) {
	const conversationMenuLink = document.querySelector(`${SELECTED_CONVERSATION} ${CONVERSATION_DROPDOWN_LINK_SUFFIX}`);
	if (!conversationMenuLink) {
		return;
	}
	conversationMenuLink.click();

	// There could be multiple menus displaying - pick the correct one
	document.querySelectorAll(CONVERSATION_DROPDOWN).forEach(menu => {
		const menuItemStrings = Array.from(menu.querySelectorAll(`${CONVERSATION_DROPDOWN_ITEM_LINK_PREFIX}`))
			.map(elem => { return elem.textContent; });

		const foundConversationMenu = menuItemStrings.includes('Mute') || menuItemStrings.includes('Unmute');
		if (!foundConversationMenu) {
			return;
		}

		const rootMenuElem = menu.parentElement.parentElement.parentElement;
		if (rootMenuElem) {
			// Hide menu before displaying. Note, don't need to un-hide 
			// after clicked as menu disappears after clicking
			rootMenuElem.style.visibility = 'hidden';
		}

		const isGroupConversation = menuItemStrings.includes('Leave Group');
		if (isGroupConversation) {
			const elem = menu.querySelector(`${CONVERSATION_DROPDOWN_ITEM_LINK_PREFIX}:nth-child(${groupIndex})`);
			if (elem) {
				elem.click();
			}
			return;
		}

		const elem = menu.querySelector(`${CONVERSATION_DROPDOWN_ITEM_LINK_PREFIX}:nth-child(${index})`);
		if (elem) {
			elem.click();
		}
	});
}
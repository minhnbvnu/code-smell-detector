function localize(english_text, ...interpolations) {
		function find_localization(english_text) {
			const amp_index = index_of_hotkey(english_text);
			if (amp_index > -1) {
				const without_hotkey = remove_hotkey(english_text);
				if (localizations[without_hotkey]) {
					const hotkey_def = english_text.slice(amp_index, amp_index + 2);
					if (localizations[without_hotkey].toUpperCase().indexOf(hotkey_def.toUpperCase()) > -1) {
						return localizations[without_hotkey];
					} else {
						if (has_hotkey(localizations[without_hotkey])) {
							// window.console && console.warn(`Localization has differing accelerator (hotkey) hint: '${localizations[without_hotkey]}' vs '${english_text}'`);
							// @TODO: detect differing accelerator more generally
							return `${remove_hotkey(localizations[without_hotkey])} (${hotkey_def})`;
						}
						return `${localizations[without_hotkey]} (${hotkey_def})`;
					}
				}
			}
			if (localizations[english_text]) {
				return localizations[english_text];
			}
			return english_text;
		}
		function interpolate(text, interpolations) {
			for (let i = 0; i < interpolations.length; i++) {
				text = text.replace(`%${i + 1}`, interpolations[i]);
			}
			return text;
		}
		return interpolate(find_localization(english_text), interpolations);
	}
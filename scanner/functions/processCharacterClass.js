function processCharacterClass(characterClassItem) {
		var set = regenerate();
		var body = characterClassItem.body.forEach(function (item) {
			switch (item.type) {
				case 'value':
					set.add(item.codePoint);
					if (ignoreCase && unicode) {
						var folded = caseFold(item.codePoint);
						if (folded) {
							set.add(folded);
						}
					}
					break;
				case 'characterClassRange':
					var min = item.min.codePoint;
					var max = item.max.codePoint;
					set.addRange(min, max);
					if (ignoreCase && unicode) {
						set.iuAddRange(min, max);
					}
					break;
				case 'characterClassEscape':
					set.add(getCharacterClassEscapeSet(item.value));
					break;
				// The `default` clause is only here as a safeguard; it should never be
				// reached. Code coverage tools should ignore it.
				/* istanbul ignore next */
				default:
					throw Error('Unknown term type: ' + item.type);
			}
		});
		if (characterClassItem.negative) {
			set = (unicode ? UNICODE_SET : BMP_SET).clone().remove(set);
		}
		update(characterClassItem, set.toString());
		return characterClassItem;
	}
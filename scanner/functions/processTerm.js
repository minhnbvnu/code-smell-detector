function processTerm(item) {
		switch (item.type) {
			case 'dot':
				update(item, (unicode ? DOT_SET_UNICODE : DOT_SET).toString());
				break;
			case 'characterClass':
				item = processCharacterClass(item);
				break;
			case 'characterClassEscape':
				update(item, getCharacterClassEscapeSet(item.value).toString());
				break;
			case 'alternative':
			case 'disjunction':
			case 'group':
			case 'quantifier':
				item.body = item.body.map(processTerm);
				break;
			case 'value':
				var codePoint = item.codePoint;
				var set = regenerate(codePoint);
				if (ignoreCase && unicode) {
					var folded = caseFold(codePoint);
					if (folded) {
						set.add(folded);
					}
				}
				update(item, set.toString());
				break;
			case 'anchor':
			case 'empty':
			case 'group':
			case 'reference':
				// Nothing to do here.
				break;
			// The `default` clause is only here as a safeguard; it should never be
			// reached. Code coverage tools should ignore it.
			/* istanbul ignore next */
			default:
				throw Error('Unknown term type: ' + item.type);
		}
		return item;
	}
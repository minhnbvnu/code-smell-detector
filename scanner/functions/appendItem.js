function appendItem(item, inFlexibleGroup, group) {
		if (isString(item)) {
			// In flexible groups, the expectedPosition does not ascend
			// to make that flexibility work;
			// otherwise, it will always ascend
			if (!inFlexibleGroup) {
				expectedPosition += 1;
			}

			order[item] = {
				separatedGroup,
				groupPosition,
				expectedPosition,
				groupName: group.groupName,
				noEmptyLineBeforeInsideGroup: group.noEmptyLineBetween,
			};

			return;
		}

		// If item is not a string, it's a group...
		if (item.emptyLineBefore) {
			separatedGroup += 1;
		}

		if (item.order === 'flexible') {
			expectedPosition += 1;
			groupPosition += 1;

			item.properties.forEach((property) => {
				appendItem(property, true, item);
			});
		} else {
			appendGroup(item);
		}
	}
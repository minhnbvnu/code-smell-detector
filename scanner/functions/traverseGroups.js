function traverseGroups(groupItems) {
			for (var g=0;g<groupItems.length;g++) {
				// check group bounds
				var bnds = groupItems[g].visibleBounds;
				if (bnds[0] > artbnds[2] || bnds[2] < artbnds[0] || bnds[1] < artbnds[3] || bnds[3] > artbnds[1]) {
					// group entirely out of artboard, so ignore
					groupItems[g].hidden = true;
					hidden.push(groupItems[g]);
				} else {
					// recursively check sub-groups
					all_groups.push(groupItems[g]);
					if (groupItems[g].groupItems.length > 0) {
						traverseGroups(groupItems[g].groupItems);
					}
				}
			}
		}
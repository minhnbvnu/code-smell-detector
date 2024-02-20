function retrieveItems(items, level) {
				for (var i = 0; i < items.length; i++) {
					if (typeof items[i] == 'object') {
						name[level] = items[i].name;
						status[level] = items[i].status || null;

						if (!filterItem(items[i], level)) {
							if (items[i].items) {
								retrieveItems(items[i].items, level + 1);
							}
						}
					}
				}
			}
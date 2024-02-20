function filterItem(item, level) {
				name[level] = item.name;
				status[level] = item.status || null;

				var selected = true;
				if (filter == ':diff')
					selected = level > 1 ? that.diff[item.key] : false;
				else
					selected = item.name.toLowerCase().indexOf(filter) != -1;


				if (selected) {
					if (level > 1) {
						var s = "";
						for (var l = level; l >= 0; l--) {
							if (status[l]) {
								s = status[l];
								break;
							}
						}

						var r = {
							key:	item.key,
							name:	name.slice(2, level + 1).join(' ▸ '),
							status:	s
						}
						if (item.value) r.value = item.value;
						if (item.url) r.url = item.url;
						if (item.urls) r.urls = item.urls;
						if (item.items) r.items = item.items;

						return result.push(r);
					}
					else if (item.items) {
						return addItems(item.items, level + 1);
					}
				}
			}
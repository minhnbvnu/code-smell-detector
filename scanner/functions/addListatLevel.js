function addListatLevel(data,level){
			data.forEach(function(item){
                var icon;
                if (item.icon) icon = Y.getImage(item.icon);
				if (!icon) icon = currentView === "modules" ? Y.getImage("module") : Y.getImage("sample");
				if (item.children) icon = Y.getImage("disk");
				items.push({label: item.title, data: item, level: level, index: index, icon: icon, info: item.info});
				itemsMap[index] = item;
				index++;

				if (item.children && item.children.length && item.isExpanded){
					addListatLevel(item.children,level+1);
				}
			});
		}
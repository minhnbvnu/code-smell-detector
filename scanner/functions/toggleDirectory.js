function toggleDirectory(item,index){
		listbox.setSelectedIndex(index);
		moduleSelectedIndex = index;
		if (item.isExpanded){
			item.isExpanded = false;
			me.refreshList();
		}else{
			item.isExpanded = true;
			if (item.children.length){
				me.refreshList();
			}else{
				console.log("load children from " + item.url);
				item.children = [{title: "loading ..."}];

				me.refreshList();

				if (itemHandler){
					itemHandler.get(item.url,function(data){
						onLoadChildren(item,data);
					});
				}else{
					FetchService.json(item.url,function(data){
						onLoadChildren(item,data);
					})
				}



			}
		}
	}
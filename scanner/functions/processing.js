function processing(struct, datasrc){
		
		var newItem = fw.utils.deepclone(struct);

		//merge
		for(p in newItem){
			newItem[p] = datasrc[p];
		}

		//fullfill smr_id

		newItem.smr_id = o.ObjectId();
		
		
		return newItem;
	}
function removeTarget(list,target){
	    var index = list.findIndex(function(item){return item.target === target;})
        if (index>=0){
            list.splice(index, 1)
        }
	}
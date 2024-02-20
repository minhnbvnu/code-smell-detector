function destroyModel(modelName, model){
		if(!ENABLE){ return; }
		if(modelName && model){
			var poll = getPoll(modelName);
			poll.destroy(model);
		}else{
			console.error('Please specify correct arugments.');
		}
		
	}
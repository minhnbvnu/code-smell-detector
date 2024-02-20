function getPoll(modelName){
		if(!_pollMap[modelName]){
			_pollMap[modelName] = new Poll(modelName);
		}
		return _pollMap[modelName];
	}
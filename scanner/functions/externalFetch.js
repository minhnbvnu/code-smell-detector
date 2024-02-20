function externalFetch(modelName, pubName, args, callback){

		var config = externalConfig[pubName];
		var method = config.method || "get";
		var url;
		if(method.toLowerCase() === "post"){
			url = (config.fetchUrl && config.fetchUrl.apply(null, args));
			config.postData = args[args.length - 1] || ""; //规定最后一个参数为postdata
		}else{
			url = (config.fetchUrl && config.fetchUrl.apply(null, args)) || config.geturl(args); //兼容老的geturl方法	
		}
		
		//分modelName存下每一个做过external.fetch的url
		if(!urlMgr[modelName]){ urlMgr[modelName] = []; }
		if(urlMgr[modelName].indexOf(url) < 0){
			urlMgr[modelName].push(url);
		}
		
		var localData = localDataMgr[url];
		if(localData){
			var dataArray = fw.utils.deepClone(localData.getData());  //生成一个对象，否则本地update导致数据同步异常
			callback(dataArray);							//run subsribe callback
		}else{
			_sync(modelName, pubName, url, callback);		//同步数据
		}

		if(config.fetchInterval && !fetchTimer[url]){
			fetchTimer[url] = setInterval(function(){
				_sync(modelName, pubName, url, callback);
			}, config.fetchInterval);
		}
		
	}
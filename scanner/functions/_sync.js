function _sync(modelName, pubName, url, callback, afterSync){

		var config = externalConfig[pubName];
		var method = config.method || "get";

		var _doSync = function(data){

			if(data.__smrerr__){
				callback([]); //TODO when DB cache hierarchy is done by susu
				return;
			}
			if(typeof remoteDataMgr[url] === "undefined"){ var firstFetch = true; }	//首次抓取不必trigger_push
			var remoteData = _resolve(data, pubName, url);	//处理原始数据
			if(firstFetch){
				remoteDataMgr[url] = remoteData;
				localDataMgr[url] = _process(modelName, pubName, url);
				var dataArray = fw.utils.deepClone(localDataMgr[url].getData());
				callback(dataArray);
			}else{
				var diff = (JSON.stringify(remoteData) === JSON.stringify(remoteDataMgr[url])); //这里可以不需要Diff工具，直接stringify对比
				if(!diff && remoteData){
					remoteDataMgr[url] = remoteData;
					localDataMgr[url] = _process(modelName, pubName, url);
					fw.netMessage.sendLocalMessage({modelName : modelName}, 'trigger_push');
				}
			}

			afterSync && afterSync();
		}

		if(method.toLowerCase() === "post"){

			var postData = encodeURIComponent(config.postData); 	//args为postData
			try{
				var postOptions = urlParser && urlParser.parse(url);
			}catch(e){
				return fw.log("externalConfig: fetchUrl must return a url \n\n", url);
			}
			
			if(!postOptions.hostname || !postOptions.pathname){
				return fw.log('unexpected post url', url);
			}

			var opts = {
				protocol : postOptions.protocol,
				hostname : postOptions.hostname,
				path : postOptions.pathname,
				port : postOptions.port || 80,
				method : 'POST',
				headers: {
			        'Content-Type': 'application/x-www-form-urlencoded',
			        'Content-Length': postData.length
			    }
			};
			try{
				_doPost(opts, postData, _doSync);
			}catch(e){
				fw.log("Fetch by post request failed", e);
				return;
			}
		}else{
			try{
				_doGet(url, _doSync);	
			}catch(e){
				fw.log("Fetch by get request failed", e);
			}
		}

	}
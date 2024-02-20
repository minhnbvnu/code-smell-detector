function externalPost(modelName, pubName, type, smrdata, args, postCallback){
		
		//generate postData and options by developers' config.
		var config = externalConfig[pubName];
		args = args.concat();	//copy args
		Array.prototype.pop.call(args); //remove callback
		var d = _getPostData(config, type, smrdata, modelName, pubName),
			opt = _getPostOptions(config, type, args);

		if(!(d && opt)){return false;}	//post config error, stop post

		var postData = encodeURIComponent(JSON.stringify(d)); //final postData
		var defaultOptions = {
			method : 'POST',
			headers: {
		        'Content-Type': 'application/x-www-form-urlencoded',
		        'Content-Length': postData.length
		    }
		};

		var opts = Library.objUtils.extend(true, defaultOptions, opt); //final options

		_doPost(opts, postData, function(data){
		 	//成功的情况下，重新拉取数据
			urlMgr[modelName].forEach(function(refetchurl){
				//_updateLocalData(modelName, pubName, refetchurl, type, smrdata);
				_sync(modelName, pubName, refetchurl, function(){});		//POST完成后重新抓取三方数据,trigger_push不用主动callback	
			});

			postCallback();

		});
		
	}
function _getPostData(config, type, data, modelName, pubName){
		
		var prefix = "on";
		var handler, ret;

		if(config.prepare){
			handler = config.prepare;
		}else{
			var handlerName = prefix + type.charAt(0).toUpperCase() + type.substring(1);
			handler = config[handlerName];
		}

		if(!handler){ fw.log("External Post", pubName, "unhandled operation type of", type); return false; } //hander未定义
		//hack doDelele/toUpdate 增量只给了smr_id, 需要查到item, 并提供给devloper
		if(type === 'delete'){
			var item;
			for(var i=0, l=urlMgr[modelName].length; i<l ;i++){
				var url = urlMgr[modelName][i];
				item = localDataMgr[url].find(data.smr_id);
				if(item){break;}
			}
			if(item){ ret = item; }

		}else if( type === 'update' ){


			var item;
			for(var i=0, l=urlMgr[modelName].length; i<l ;i++){
				var url = urlMgr[modelName][i];
				
				item = localDataMgr[url].find(data.smr_id);
				if(item){break;}
			}

			if(item){
				ret = fw.utils.merge(data, item);	//更新操作, 提供最新数据
			}
		}else{
			ret = data;
		}

		if(typeof ret === "undefined"){
			fw.log("Cannot find model ", data.smr_id ,"external post");
		}
		if(config.prepare){
			return handler(type, ret);
		}else{
			return handler(ret);
		}

	}
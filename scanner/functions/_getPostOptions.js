function _getPostOptions(config, type, args){
		
		var suffix = 'Url';
		var opts;
		args = args.concat();	//copy args
		if(config.postUrl){
			Array.prototype.unshift.call(args, type);
			opts = config.postUrl.apply(null, args);
		}else{
			opts = config[type + suffix].apply(null, args);
		}
		
		if(!opts) { fw.log("External Post ", pubName, "options have no post config!" ); return false; }

		return opts;
	}
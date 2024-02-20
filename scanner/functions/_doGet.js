function _doGet(url, cb, errorHandler, timeoutHandler){
		
		var chunks = [];
		var size = 0;
		var urlObj = urlParser && urlParser.parse(url);
		var mode = urlObj.protocol === "https" ? https : http;
		if(urlObj && urlObj.protocol){
			delete urlObj.protocol;	
		}
		var getRequest = mode.get(url, function(res){
		
			var data = null;
			
			res.on('data', function(chunk){
				
				chunks.push(chunk);
				size += chunk.length;
				
			});
			
			res.on('end', function(){
				
				switch(chunks.length){
					case 0 : 
						data = new Buffer(0);
						break;
					case 1 :
						data = chunks[0]; 
						break;
					default : 
						data = new Buffer(size);
						for (var i = 0, pos = 0, l = chunks.length; i < l; i++) {
							var buf = chunks[i];
							buf.copy(data, pos);
							pos += buf.length;
						}
						break;
				}
				
				cb(data);
				
			});
			
		});
		
		//error handler
		getRequest.on('error', function(err){
			var errMsg = "Error when do external fetch";
			fw.log(errMsg, url);
			errorHandler && errorHandler(err);
			var errInfo = {
				errMsg : errMsg,
				errUrl : url,
				err : err,
				__smrerr__ : true
			};
			cb(errInfo);
		});
		
		//timeout handler
		getRequest.setTimeout( REQUEST_TIMEOUT, function(info){
			var timeoutMsg = "Timeout when do external fetch";
			fw.log(timeoutMsg, url);
			timeoutHandler && timeoutHandler();
			var timeoutInfo = {
				errMsg : timeoutMsg,
				errUrl : url,
				err : info,
				__smrerr__ : true
			};
			cb(timeoutInfo);
		});
		
	}
function _doPost(options, postData, cb, errorHandler, timeoutHandler){
		
		var chunks = [];
		var size = 0;
		var mode = options.protocol === "https" ? https : http;
		if(options && options.protocol){
			delete options.protocol;	
		}
		var postRequest = mode.request(options, function(res){
			
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

		postRequest.write(postData);
		postRequest.end();
		
		//error handler
		postRequest.on('error', function(err){
			var errMsg = "Error when do external post";
			fw.log(errMsg, options, postData);
			errorHandler && errorHandler(err);
			var errInfo = {
				errMsg : errMsg,
				options : options,
				requestBody : postData,
				err : err,
				__smrerr__ : true
			};
			cb(errInfo);
		});
		
		//timeout handler
		postRequest.setTimeout( REQUEST_TIMEOUT, function(){
			var timeoutMsg = "Timeout when do external post";
			fw.log(timeoutMsg, options, postData);
			timeoutHandler && timeoutHandler();
			var timeoutInfo = {
				errMsg : timeoutMsg,
				options : options,
				requestBody : postData,
				__smrerr__ : true
			};
			cb(timeoutInfo);
		});
		
	}
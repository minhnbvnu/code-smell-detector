function getExtData(modelName, pubname, opts, params, callback) {

		var url = opts.geturl(params);

		http.get(url, function(res){
			
			var data = '';

			res.on('data', function(chunk){
				
				data += chunk;

			});
			
			res.on('end', function(){

				var input = opts.resolve ? opts.resolve(data) : JSON.parse(data);
				//input转化为数组
				input = Array.isArray(input) ? input : [ input ];

				if(typeof inputMgr[url] === 'undefined'){ //首次fetch
					
					inputMgr[url] = input;
					var output = generateOutput(input, modelName);
					callback(output);
					outputMgr[url] = output;

				}

			});
			
		});

	}
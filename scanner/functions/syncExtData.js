function syncExtData(modelName, pubname, opts, params, callback){

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

				var diffData = findDiff(input, inputMgr[url], modelName);

				if(diffData.length){
					var output = generateOutput(input, modelName);
					outputMgr[url] = output;
					inputMgr[url] = input;
					fw.netMessage.sendLocalMessage({modelName: modelName}, 'trigger_push');
				}

			});
			
		});

	}
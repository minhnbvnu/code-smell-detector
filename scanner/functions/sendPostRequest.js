function sendPostRequest(options, postData, cb, buffer){
		//server
		if(fw.IS_SUMERU_SERVER){
            postData = encodeURIComponent(JSON.stringify(postData));
            var defaultOptions = {
				method : 'POST',
				headers: {
			        'Content-Type': 'application/x-www-form-urlencoded',
			        'Content-Length': postData.length
			    }
			};

			var opts = Library.objUtils.extend(true, defaultOptions, options);

	        _doPost(opts, postData, function(data){
	        	data = buffer ? data : data.toString();
	        	cb(data);
	        });

		} else { //client
			if(!options || !postData){fw.log("please specify options or postData for sumeru.external.post");return false;}
			cb = cb || function(){};

			var cbn = "WAITING_EXTERNAL_POST_CALLBACK_" + fw.utils.randomStr(8);

			fw.netMessage.setReceiver({
		        onMessage : {
		            target : cbn,
		            overwrite: true,
		            once:true,
		            handle : function(data){
		            	cb(data);
		            }
		        }
		    });

			fw.netMessage.sendMessage({
		        cbn : cbn,
		        options : options,
		        postData : postData,
		        buffer : buffer
		    }, "SEND_EXTERNAL_POST");
		}

	}
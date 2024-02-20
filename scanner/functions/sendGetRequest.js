function sendGetRequest(url, cb, buffer){
		//server
		if(fw.IS_SUMERU_SERVER){
			_doGet(url, function(data){
	        	data = buffer ? data : data.toString();
	        	cb(data);
	        });
		} else { //client
			if(!url || !cb){ fw.log('Please specify url and callback for sumeru.external.get!');}
			var cbn = "WAITING_EXTERNAL_GET_CALLBACK_" + fw.utils.randomStr(8);

			fw.netMessage.setReceiver({
		        onMessage : {
		            target : cbn,
		            overwrite: true,
		            once: true,
		            handle : function(data){
		            	cb(data);
		            }
		        }
		    });

			fw.netMessage.sendMessage({
		        cbn : cbn,
		        url : url,
		        buffer : buffer
		    }, "SEND_EXTERNAL_GET");
		}
	    
	}
function checkIfReady(callback){
	        if (driver.isReady()) {
	            opts.onReady(_player);
	        } else if (attempts < 20000) {
	            setTimeout(checkIfReady,10);
				attempts++;
	        } else {
	        	throw('Error with player driver');
	        }
	    }
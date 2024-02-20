function noErrorTx(e, tx, cb) {
	    if (e) {
	        tx.abort(function () {
	            cb(e);
	        });
	        return false;
	    }
	    return true;
	}
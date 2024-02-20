function multiAdd(times, done) {
        if (times > 0) {
            addOne().done(function () {
            	multiAdd(times - 1, done);
            });
        } else {
        	done();
        }
    }
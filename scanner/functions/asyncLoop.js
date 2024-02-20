function asyncLoop(o) {
	        var i = -1,
	            length = o.length;

	        var loop = function() {
	            i++;
	            if (i === length) {
	                o.callback();
	                return;
	            }
	            o.functionToLoop(loop, i);
	        };
	        loop(); //init
	    }
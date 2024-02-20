function processInWebWorker(_function) {
	        var blob = URL.createObjectURL(new Blob([_function.toString(),
	            'this.onmessage =  function (e) {' + _function.name + '(e.data);}'
	        ], {
	            type: 'application/javascript'
	        }));

	        var worker = new Worker(blob);
	        URL.revokeObjectURL(blob);
	        return worker;
	    }
function WorkerFS(worker, deprecateMsg) {
	        var this$1 = this;
	        if ( deprecateMsg === void 0 ) deprecateMsg = true;
	
	        BaseFileSystem$$1.call(this);
	        this._callbackConverter = new CallbackArgumentConverter();
	        this._isInitialized = false;
	        this._isReadOnly = false;
	        this._supportLinks = false;
	        this._supportProps = false;
	        this._worker = worker;
	        deprecationMessage(deprecateMsg, WorkerFS.Name, { worker: "Web Worker instance" });
	        this._worker.addEventListener('message', function (e) {
	            var resp = e.data;
	            if (isAPIResponse(resp)) {
	                var i;
	                var args = resp.args;
	                var fixedArgs = new Array(args.length);
	                // Dispatch event to correct id.
	                for (i = 0; i < fixedArgs.length; i++) {
	                    fixedArgs[i] = this$1._argRemote2Local(args[i]);
	                }
	                this$1._callbackConverter.toLocalArg(resp.cbId).apply(null, fixedArgs);
	            }
	        });
	    }
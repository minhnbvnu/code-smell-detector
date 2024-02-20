function WorkerFile(_fs, _path, _flag, _stat, remoteFdId, contents) {
	        PreloadFile$$1.call(this, _fs, _path, _flag, _stat, contents);
	        this._remoteFdId = remoteFdId;
	    }
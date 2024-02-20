function mkdirpSync(p, mode, fs) {
	    if (!fs.existsSync(p)) {
	        mkdirpSync(path.dirname(p), mode, fs);
	        fs.mkdirSync(p, mode);
	    }
	}
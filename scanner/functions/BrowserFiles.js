function BrowserFiles(files) {
	    if (files == null || files.length < 1) {
	      throw new Error("When calling browserFiles, at least 1 file is required, " + ("but received " + files));
	    }

	    this.files = files;
	  }
function browserDownloads(fileNamePrefix) {
	  if (fileNamePrefix === void 0) {
	    fileNamePrefix = 'model';
	  }

	  return new BrowserDownloads(fileNamePrefix);
	}
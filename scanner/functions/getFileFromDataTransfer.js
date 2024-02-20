function getFileFromDataTransfer(item) {
	  if (item.kind == 'file') {
	    return item.getAsFile();
	  }
	}
function withSaveHandler(saveHandler) {
	  return new PassthroughSaver(saveHandler);
	}
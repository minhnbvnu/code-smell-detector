function isDatasetObject(dataset) {
	  return typeof dataset.iterator === 'function';
	}
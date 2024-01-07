function csv(source, csvConfig) {
	  if (csvConfig === void 0) {
	    csvConfig = {};
	  }

	  return new CSVDataset(new URLDataSource(source), csvConfig);
	}
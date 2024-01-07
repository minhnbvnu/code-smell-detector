function DataStorage(backend, dataMover) {
	    this.backend = backend;
	    this.dataMover = dataMover;
	    this.data = new WeakMap();
	    this.dataIdsCount = 0;
	  }
function HashTable(keyDType, valueDType) {
	    this.keyDType = keyDType;
	    this.valueDType = valueDType;
	    this.handle = scalar(0); // tslint:disable-next-line: no-any

	    this.tensorMap = new Map();
	    keep(this.handle);
	  }
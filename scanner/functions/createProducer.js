function createProducer(tapVersion) {
	    var producers = {
	      '12': new TAP12Producer(),
	      '13': new TAP13Producer()
	    };
	    var producer = producers[tapVersion];

	    if (!producer) {
	      throw new Error('invalid or unsupported TAP version: ' + JSON.stringify(tapVersion));
	    }

	    return producer;
	  }
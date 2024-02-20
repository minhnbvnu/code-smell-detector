function P2(x){
	    var self = new P(x);
	    setProto(self, P2.prototype);
	    return self;
	  }
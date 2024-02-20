function readReference(nb) {
	if (nb in this.backref)
	    return this.backref[nb];
	else
	    throw "bad reference: " + nb;
    }
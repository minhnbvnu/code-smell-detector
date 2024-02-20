function storeRefence(nb) {
	var tmp = this.read();
	this.backref[nb] = tmp;
	return tmp;
    }
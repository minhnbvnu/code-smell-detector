function ARC4init(key) {
	  var i, j, t;
	  for(i = 0; i < 256; ++i)
		this.S[i] = i;
	  j = 0;
	  for(i = 0; i < 256; ++i) {
		j = (j + this.S[i] + key[i % key.length]) & 255;
		t = this.S[i];
		this.S[i] = this.S[j];
		this.S[j] = t;
	  }
	  this.i = 0;
	  this.j = 0;
	}
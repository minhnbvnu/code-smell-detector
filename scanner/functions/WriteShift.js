function WriteShift(t, val, f) {
	var size = 0, i = 0;
	switch(f) {
		case "hex": for(; i < t; ++i) {
this[this.l++] = parseInt(val.slice(2*i, 2*i+2), 16)||0;
		} return this;
		case "utf16le":
var end = this.l + t;
			for(i = 0; i < Math.min(val.length, t); ++i) {
				var cc = val.charCodeAt(i);
				this[this.l++] = cc & 0xff;
				this[this.l++] = cc >> 8;
			}
			while(this.l < end) this[this.l++] = 0;
			return this;
	}
switch(t) {
		case  1: size = 1; this[this.l] = val&0xFF; break;
		case  2: size = 2; this[this.l] = val&0xFF; val >>>= 8; this[this.l+1] = val&0xFF; break;
		case  4: size = 4; __writeUInt32LE(this, val, this.l); break;
		case -4: size = 4; __writeInt32LE(this, val, this.l); break;
	}
	this.l += size; return this;
}
constructor(arrayBuffer, { toRGBA } = { toRGBA: false }) {
		this.view = new DataView(arrayBuffer);
		this.toRGBA = !!toRGBA;
		this.pos = 0;
		this.bottomUp = true;
		this.flag = String.fromCharCode(this.view.getUint8(0)) + String.fromCharCode(this.view.getUint8(1));
		this.pos += 2;
		if (this.flag !== 'BM') {
			throw new Error('Invalid BMP File');
		}
		this.locRed = this.toRGBA ? 0 : 3;
		this.locGreen = this.toRGBA ? 1 : 2;
		this.locBlue = this.toRGBA ? 2 : 1;
		this.locAlpha = this.toRGBA ? 3 : 0;
		this.parseHeader();
		this.parseRGBA();
	}
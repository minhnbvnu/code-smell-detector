function checkGadget (base, size, gadget, offset) {
		if (offset + gadget.length >= size) { return false; }
		return self.memview(utils.add2(base, offset), gadget.length, function (ab) {
			var u8 = new Uint8Array(ab);
			for (var i = 0; i < gadget.length; ++i) {
				if (gadget[i] !== -1 && gadget[i] !== u8[i]) { return false; }
			}
			return true;
		});
	}
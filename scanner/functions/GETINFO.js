function GETINFO(state) {
	    var stack = state.stack;
	    var sel = stack.pop();
	    var r = 0;

	    if (exports.DEBUG) { console.log(state.step, 'GETINFO[]', sel); }

	    // v35 as in no subpixel hinting
	    if (sel & 0x01) { r = 35; }

	    // TODO rotation and stretch currently not supported
	    // and thus those GETINFO are always 0.

	    // opentype.js is always gray scaling
	    if (sel & 0x20) { r |= 0x1000; }

	    stack.push(r);
	}
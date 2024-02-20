function SDPVTL(a, state) {
	    var stack = state.stack;
	    var p2i = stack.pop();
	    var p1i = stack.pop();
	    var p2 = state.z2[p2i];
	    var p1 = state.z1[p1i];

	    if (exports.DEBUG) { console.log(state.step, 'SDPVTL[' + a + ']', p2i, p1i); }

	    var dx;
	    var dy;

	    if (!a) {
	        dx = p1.x - p2.x;
	        dy = p1.y - p2.y;
	    } else {
	        dx = p2.y - p1.y;
	        dy = p1.x - p2.x;
	    }

	    state.dpv = getUnitVector(dx, dy);
	}
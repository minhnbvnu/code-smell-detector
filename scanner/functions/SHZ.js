function SHZ(a, state) {
	    var stack = state.stack;
	    var rpi = a ? state.rp1 : state.rp2;
	    var rp = (a ? state.z0 : state.z1)[rpi];
	    var fv = state.fv;
	    var pv = state.pv;

	    var e = stack.pop();

	    if (exports.DEBUG) { console.log(state.step, 'SHZ[' + a + ']', e); }

	    var z;
	    switch (e) {
	        case 0 : z = state.tZone; break;
	        case 1 : z = state.gZone; break;
	        default : throw new Error('Invalid zone');
	    }

	    var p;
	    var d = pv.distance(rp, rp, false, true);
	    var pLen = z.length - 2;
	    for (var i = 0; i < pLen; i++)
	    {
	        p = z[i];
	        fv.setRelative(p, p, d, pv);
	        //if (p !== rp) fv.setRelative(p, p, d, pv);
	    }
	}
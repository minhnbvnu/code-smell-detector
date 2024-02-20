function IUP(v, state) {
	    var z2 = state.z2;
	    var pLen = z2.length - 2;
	    var cp;
	    var pp;
	    var np;

	    if (exports.DEBUG) { console.log(state.step, 'IUP[' + v.axis + ']'); }

	    for (var i = 0; i < pLen; i++) {
	        cp = z2[i]; // current point

	        // if this point has been touched go on
	        if (v.touched(cp)) { continue; }

	        pp = cp.prevTouched(v);

	        // no point on the contour has been touched?
	        if (pp === cp) { continue; }

	        np = cp.nextTouched(v);

	        if (pp === np) {
	            // only one point on the contour has been touched
	            // so simply moves the point like that

	            v.setRelative(cp, cp, v.distance(pp, pp, false, true), v, true);
	        }

	        v.interpolate(cp, pp, np, v);
	    }
	}
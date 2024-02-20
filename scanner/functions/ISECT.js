function ISECT(state)
	{
	    var stack = state.stack;
	    var pa0i = stack.pop();
	    var pa1i = stack.pop();
	    var pb0i = stack.pop();
	    var pb1i = stack.pop();
	    var pi = stack.pop();
	    var z0 = state.z0;
	    var z1 = state.z1;
	    var pa0 = z0[pa0i];
	    var pa1 = z0[pa1i];
	    var pb0 = z1[pb0i];
	    var pb1 = z1[pb1i];
	    var p = state.z2[pi];

	    if (exports.DEBUG) { console.log('ISECT[], ', pa0i, pa1i, pb0i, pb1i, pi); }

	    // math from
	    // en.wikipedia.org/wiki/Line%E2%80%93line_intersection#Given_two_points_on_each_line

	    var x1 = pa0.x;
	    var y1 = pa0.y;
	    var x2 = pa1.x;
	    var y2 = pa1.y;
	    var x3 = pb0.x;
	    var y3 = pb0.y;
	    var x4 = pb1.x;
	    var y4 = pb1.y;

	    var div = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
	    var f1 = x1 * y2 - y1 * x2;
	    var f2 = x3 * y4 - y3 * x4;

	    p.x = (f1 * (x3 - x4) - f2 * (x1 - x2)) / div;
	    p.y = (f1 * (y3 - y4) - f2 * (y1 - y2)) / div;
	}
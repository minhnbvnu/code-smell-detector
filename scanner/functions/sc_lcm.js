function sc_lcm() {
    var lcm = 1;
    for (var i = 0; i < arguments.length; i++) {
	var f = Math.round(arguments[i] / sc_euclid_gcd(arguments[i], lcm));
	lcm *= Math.abs(f);
    }
    return lcm;
}
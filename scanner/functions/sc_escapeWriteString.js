function sc_escapeWriteString(s) {
    var res = "";
    var j = 0;
    for (i = 0; i < s.length; i++) {
	switch (s.charAt(i)) {
	case "\0": res += s.substring(j, i) + "\\0"; j = i + 1; break;
	case "\b": res += s.substring(j, i) + "\\b"; j = i + 1; break;
	case "\f": res += s.substring(j, i) + "\\f"; j = i + 1; break;
	case "\n": res += s.substring(j, i) + "\\n"; j = i + 1; break;
	case "\r": res += s.substring(j, i) + "\\r"; j = i + 1; break;
	case "\t": res += s.substring(j, i) + "\\t"; j = i + 1; break;
	case "\v": res += s.substring(j, i) + "\\v"; j = i + 1; break;
	case '"': res += s.substring(j, i) + '\\"'; j = i + 1; break;
	case "\\": res += s.substring(j, i) + "\\\\"; j = i + 1; break;
	default:
	    var c = s.charAt(i);
	    if ("\a" !== "a" && c == "\a") {
		res += s.substring(j, i) + "\\a"; j = i + 1; continue;
	    }
	    if ("\v" !== "v" && c == "\v") {
		res += s.substring(j, i) + "\\v"; j = i + 1; continue;
	    }
	    //if (s.charAt(i) < ' ' || s.charCodeAt(i) > 127) {
	    // CARE: Manuel is this OK with HOP?
	    if (s.charAt(i) < ' ') {
		/* non printable character and special chars */
		res += s.substring(j, i) + "\\x" + s.charCodeAt(i).toString(16);
		j = i + 1;
	    }
	    // else just let i increase...
	}
    }
    res += s.substring(j, i);
    return res;
}
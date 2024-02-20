function sc_toWriteString(o) {
    if (o === null)
	return "()";
    else if (o === true)
	return "#t";
    else if (o === false)
	return "#f";
    else if (o === undefined)
	return "#unspecified";
    else if (typeof o === 'function')
	return "#<procedure " + sc_hash(o) + ">";
    else if (o.sc_toWriteString)
	return o.sc_toWriteString();
    else
	return o.toString();
}
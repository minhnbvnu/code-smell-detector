function sc_hash(o) {
    if (o === null)
	return "null";
    else if (o === undefined)
	return "undefined";
    else if (o === true)
	return "true";
    else if (o === false)
	return "false";
    else if (typeof o === "number")
	return "num-" + o;
    else if (typeof o === "string")
	return "jsstr-" + o;
    else if (o.sc_getHash)
	return o.sc_getHash();
    else
	return sc_counterHash.call(o);
}
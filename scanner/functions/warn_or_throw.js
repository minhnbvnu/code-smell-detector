function warn_or_throw(wrn, msg) {
	if(wrn) { if(typeof console !== 'undefined') console.error(msg); }
	else throw new Error(msg);
}
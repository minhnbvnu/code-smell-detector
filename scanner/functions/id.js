function id( name ) {
	return !!( typeof document !== "undefined" && document && document.getElementById ) &&
		document.getElementById( name );
}
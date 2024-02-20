function expectSync( elem, type ) {
	return ( elem === safeActiveElement() ) === ( type === "focus" );
}
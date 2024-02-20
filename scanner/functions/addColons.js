function addColons(s) {
	/*JSSTYLED*/
	return (s.replace(/(.{2})(?=.)/g, '$1:'));
}
function escapeWhitespace(s, escapeSpaces) {
	s = s.replace("\t","\\t");
	s = s.replace("\n","\\n");
	s = s.replace("\r","\\r");
	if(escapeSpaces) {
		s = s.replace(" ","\u00B7");
	}
	return s;
}
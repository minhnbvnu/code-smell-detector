function _fnEscapeRegex ( sVal )
	{
		return sVal.replace( _re_escape_regex, '\\$1' );
	}
function sc_isCharAlphabetic(c)
    { return sc_isCharOfClass(c.val, SC_LOWER_CLASS) ||
	  sc_isCharOfClass(c.val, SC_UPPER_CLASS); }
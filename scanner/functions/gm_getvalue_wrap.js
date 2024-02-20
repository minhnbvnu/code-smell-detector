function gm_getvalue_wrap(key) {
		var value = GM_getValue(key, void 0);
		if (value === null && gm_check_nonexistent())
			value = void 0;
		return value;
	}
function gm_check_nonexistent() {
		if (gm_nonexistent_is_null !== null)
			return gm_nonexistent_is_null;
		gm_nonexistent_is_null = GM_getValue("nonexistent_value_abcdefg", void 0) === null;
		return gm_nonexistent_is_null;
	}
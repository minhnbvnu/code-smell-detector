function tsip_uri_strcmp(s_s1, s_s2, b_case_sensitive){
	if(s_s1 && s_s2){
		var b_s1_is_encoded = false;
		var b_s2_is_encoded = false;

		if(tsk_string_contains(s_s1, s_s1.length, "%")){
			b_s1_is_encoded = true;
			s_s1 = decodeURIComponent(s_s1);
		}
		if(tsk_string_contains(s_s2, s_s2.length, "%")){
			b_s2_is_encoded = true;
			s_s2 = decodeURIComponent(s_s2);
		}

		return b_case_sensitive ? s_s1.localeCompare(s_s2) : s_s1.toLowerCase().localeCompare(s_s2.toLowerCase());
	}
	return -1;
}
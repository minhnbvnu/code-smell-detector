function tsip_uri_tostring(o_self, b_with_params, b_quote){
	if(o_self){
	    if (b_quote) {
	        var s_str = "";
			if(o_self.s_display_name){
                s_str += tsk_string_format("\"{0}\"", o_self.s_display_name);
			}
            s_str += tsk_string_format("<{0}>", __tsip_uri_tostring(o_self, b_with_params));
            return s_str;
		}
		else{
		    return __tsip_uri_tostring(o_self, b_with_params);
		}
	}
	else{
		tsk_utils_log_error("Invalid argument");
		return null;
	}
}
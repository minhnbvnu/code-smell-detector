function tsip_uri_compare(o_uri_1, o_uri_2){
	if(o_uri_1 && o_uri_2){
		var o_param_1;
		var o_param_2;
        var i_ret;

		/* RFC 3261 - 19.1.4 URI Comparison

			Comparison of the userinfo of SIP and SIPS URIs is case-sensitive.  This includes userinfo containing passwords or
			formatted as telephone-subscribers.  Comparison of all other components of the URI is case-insensitive unless explicitly
			defined otherwise.

			An IP address that is the result of a DNS lookup of a host name does not match that host name.

			For two URIs to be equal, the user, password, host, and port components must match.

			A URI omitting the user component will not match a URI that includes one.  A URI omitting the password component will not
			match a URI that includes one.

			userinfo	= 	( user   /   telephone-subscriber )   [ ":" password ]   "@" 
		*/
		if(!tsk_string_equals(o_uri_1.s_scheme, o_uri_2.s_scheme) ||
			!tsip_uri_strequals(o_uri_1.s_user_name, o_uri_2.s_user_name) ||
			!tsip_uri_strequals(o_uri_1.s_host, o_uri_2.s_host) ||
			!tsk_string_equals(o_uri_1.s_password, o_uri_2.s_password) ||
			o_uri_1.i_port != o_uri_2.i_port){
				return -2;
		}

		/* Is there parameters */
		if((!o_uri_1.ao_params && !o_uri_2.ao_params) || (o_uri_1.ao_params.length == 0 && o_uri_2.ao_params.length == 0)){
			return 0;
		}

		/*	RFC 3261 - 19.1.4 URI Comparison
			
			A URI omitting any component with a default value will not match a URI explicitly containing that component with its
			default value.  For instance, a URI omitting the optional port component will not match a URI explicitly declaring port 5060.
			The same is true for the transport-parameter, ttl-parameter, user-parameter, and method components.

			-  A user, ttl, or method uri-parameter appearing in only one URI never matches, even if it contains the default value.
			-  A URI that includes an maddr parameter will not match a URI that contains no maddr parameter.
		*/
        if((i_ret = tsip_uri_compare_parameter(o_uri_1, o_uri_2, "transport")) != 0){
            return i_ret;
        }
        if((i_ret = tsip_uri_compare_parameter(o_uri_1, o_uri_2, "ttl")) != 0){
            return i_ret;
        }
        if((i_ret = tsip_uri_compare_parameter(o_uri_1, o_uri_2, "user")) != 0){
            return i_ret;
        }
        if((i_ret = tsip_uri_compare_parameter(o_uri_1, o_uri_2, "method")) != 0){
            return i_ret;
        }
        if((i_ret = tsip_uri_compare_parameter(o_uri_1, o_uri_2, "maddr")) != 0){
            return i_ret;
        }

		/*	RFC 3261 - 19.1.4 URI Comparison
			
			URI uri-parameter components are compared as follows:

			1 -  Any uri-parameter appearing in both URIs must match.
			2 -  All other uri-parameters appearing in only one URI are ignored when comparing the URIs.

			o  URI header components are never ignored.  Any present header component MUST be present in both URIs and match for the URIs
			to match.  The matching rules are defined for each header field in Section 20.
		*/
		for(var i = 0; i < o_uri_1.ao_params.length; ++i){
			o_param_1 = o_uri_1.ao_params[i];
			if((o_param_2 = tsk_param_get_by_name(o_uri_2.ao_params, o_param_1.s_name))){
				if(!tsip_uri_striequals(o_param_1.s_value, o_param_2.s_value)){
					return -4;
				}
			}
		}
        for(var i = 0; i < o_uri_2.ao_params.length; ++i){
			o_param_2 = o_uri_2.ao_params[i];
			if((o_param_1 = tsk_param_get_by_name(o_uri_1.ao_params, o_param_2.s_name))){
				if(!tsip_uri_striequals(o_param_1.s_value, o_param_2.s_value)){
					return -4;
				}
			}
		}
		return 0;
	}
	else{
		return (!o_uri_1 && !o_uri_2) ? 0 : -1;
	}
}
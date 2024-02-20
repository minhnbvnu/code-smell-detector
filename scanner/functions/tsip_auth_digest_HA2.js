function tsip_auth_digest_HA2(s_method, s_url, o_entity_body, s_qop){
	/* RFC 2617 - 3.2.2.3 A2

	If the "qop" directive's value is "auth" or is unspecified, then A2
	is:
	A2       = Method ":" digest-url-value

	If the "qop" value is "auth-int", then A2 is:
	A2       = Method ":" digest-url-value ":" H(entity-body)
	*/

	var s_a2 = null;

	if(tsk_string_is_null_or_empty(s_qop) || tsk_string_iequals(s_qop, "auth")){
		s_a2 = tsk_string_format("{0}:{1}", s_method, s_url);
	}
	else if(tsk_string_iequals(s_qop, "auth-int")){
		if(o_entity_body){
			var s_hEntity = MD5.hash(o_entity_body);
			s_a2 = tsk_string_format("{0}:{1}:{2}", s_method, s_url, s_hEntity);
		}
		else{
            s_a2 = tsk_string_format("{0}:{1}:{2}", s_method, s_url, "d41d8cd98f00b204e9800998ecf8427e");
		}
	}

    return MD5.hexdigest(s_a2);
}
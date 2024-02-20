function tsip_auth_digest_HA1(s_username, s_realm, s_password){
	/* RFC 2617 - 3.2.2.2 A1
		A1       = unq(username-value) ":" unq(realm-value) ":" passwd
	*/
    return MD5.hexdigest(tsk_string_format("{0}:{1}:{2}", s_username, s_realm, s_password));
}
function tsip_auth_digest_HA1sess(s_username, s_realm, s_password, s_nonce, s_cnonce){

	/* RFC 2617 - 3.2.2.2 A1
			A1       = H( unq(username-value) ":" unq(realm-value)
                     ":" passwd )
                     ":" unq(nonce-value) ":" unq(cnonce-value)
	*/
    return MD5.hexdigest(tsk_string_format("{0}:{1}:{2}:{3}:{4}", s_username, s_realm, s_password, s_nonce, s_cnonce));
}
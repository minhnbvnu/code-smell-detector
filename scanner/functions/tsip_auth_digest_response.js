function tsip_auth_digest_response(s_ha1, s_nonce, s_noncecount, s_cnonce, s_qop, s_ha2){
	/* RFC 2617 3.2.2.1 Request-Digest

	============ CASE 1 ============
	If the "qop" value is "auth" or "auth-int":
	request-digest  = <"> < KD ( H(A1),     unq(nonce-value)
	":" nc-value
	":" unq(cnonce-value)
	":" unq(qop-value)
	":" H(A2)
	) <">
	============ CASE 2 ============
	If the "qop" directive is not present (this construction is for
	compatibility with RFC 2069):
	request-digest  =
	<"> < KD ( H(A1), unq(nonce-value) ":" H(A2) ) >
	<">
	*/

	if(tsk_string_iequals(s_qop, "auth") || tsk_string_iequals(s_qop, "auth-int")){
		/* CASE 1 */
	    return MD5.hexdigest(tsk_string_format("{0}:{1}:{2}:{3}:{4}:{5}", s_ha1, s_nonce, s_noncecount, s_cnonce, s_qop, s_ha2));
	}
	else{
		/* CASE 2 */
	    return MD5.hexdigest(tsk_string_format("{0}:{1}:{2}", s_ha1, s_nonce, s_ha2));
	}
}
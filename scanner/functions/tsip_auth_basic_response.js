function tsip_auth_basic_response(s_userid, s_password){
	/* RFC 2617 - 2 Basic Authentication Scheme
	
	To receive authorization, the client sends the userid and password,
	separated by a single colon (":") character, within a base64 [7]
	encoded string in the credentials.
	*/
	
    return Base64.encode(tsk_string_format("{0}:{1}", s_userid, s_password));
}
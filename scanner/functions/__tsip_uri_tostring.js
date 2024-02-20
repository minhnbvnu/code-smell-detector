function __tsip_uri_tostring(o_self, b_with_params) {
	// e.g. sip:alice:secretword@atlanta.com:65535
	var s_uri = tsk_string_format("{0}:{1}{2}{3}{4}{5}{6}{7}{8}{9}", 

		o_self.s_scheme ? o_self.s_scheme : "sip", /* default scheme is sip: */

		o_self.s_user_name ? o_self.s_user_name : "",

		o_self.s_password ? ":" : "",
		o_self.s_password ? o_self.s_password : "",

		o_self.s_host ? (o_self.s_user_name ? "@" : "") : "",
		o_self.e_host_type == tsip_host_type_e.ipv6 ? "[" : "",
		o_self.s_host ? o_self.s_host : "",
		o_self.e_host_type == tsip_host_type_e.ipv6 ? "]" : "",

		o_self.i_port > 0 ? ":" : "",
		o_self.i_port > 0 ? o_self.i_port : ""
		);
	
	// Params
	if (s_uri && b_with_params && o_self.ao_params.length > 0) {
        s_uri += tsk_string_format(";{0}", tsk_params_tostring(o_self.ao_params, ';'));
    }
	
	return s_uri;
}
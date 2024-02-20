function tsip_challenge(o_stack, b_isproxy, s_scheme, s_realm, s_nonce, s_opaque, s_algorithm, s_qop) {
    this.o_stack = o_stack;
    this.b_isproxy = b_isproxy;
	this.s_scheme = s_scheme;
	this.s_realm = s_realm;
	this.s_nonce = s_nonce;
	this.s_opaque = s_opaque;
	this.s_algorithm = s_algorithm;
	this.s_cnonce = null;
	this.i_nc = 0;
	if (s_qop) {
	    this.s_qop = tsk_string_contains(s_qop, s_qop.length, "auth-int") ? "auth-int" :
					(tsk_string_contains(s_qop, s_qop.length, "auth") ? "auth" : null);
	    this.reset_cnonce();
	}
}
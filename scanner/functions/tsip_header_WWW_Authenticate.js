function tsip_header_WWW_Authenticate(){
	tsip_header.call(this, tsip_header_type_e.WWW_Authenticate);
	this.s_scheme = null;
	this.s_realm = null;
	this.s_domain = null;
	this.s_nonce = null;
	this.s_opaque = null;
	this.b_stale = false;
	this.s_algorithm = null;
	this.s_qop = null;
}
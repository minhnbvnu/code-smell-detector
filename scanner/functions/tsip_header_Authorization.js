function tsip_header_Authorization(){
	tsip_header.call(this, tsip_header_type_e.Authorization);
	this.s_scheme = null;
	this.s_username = null;
	this.s_realm = null;
	this.s_nonce = null;
	this.s_uri = null;
	this.s_response = null;
	this.s_algorithm = null;
	this.s_cnonce = null;
	this.s_opaque = null;
	this.s_qop = null;
	this.s_nc = null; 
}
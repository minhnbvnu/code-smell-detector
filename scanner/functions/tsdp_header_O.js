function tsdp_header_O(s_username, i_sess_id, i_sess_version, s_nettype, s_addrtype, s_addr){
	tsdp_header.call(this, tsdp_header_type_e.O);
	this.s_username = s_username;
	this.i_sess_id = i_sess_id;
	this.i_sess_version = i_sess_version;
	this.s_nettype = s_nettype;
	this.s_addrtype = s_addrtype;
	this.s_addr = s_addr;
}
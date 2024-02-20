function tsdp_header_C(s_nettype, s_addrtype, s_addr){
	tsdp_header.call(this, tsdp_header_type_e.C);
	this.s_nettype = s_nettype;
	this.s_addrtype = s_addrtype;
	this.s_addr = s_addr;
}
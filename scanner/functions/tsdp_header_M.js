function tsdp_header_M(s_media, i_port, s_proto){
	tsdp_header.call(this, tsdp_header_type_e.M);
	this.s_media = s_media;
	this.i_port = i_port;
	this.i_nports = 0; // number of ports
	this.s_proto = s_proto;
	this.as_fmt = new Array();

	this.o_hdr_I = null;
	this.o_hdr_C = null;
	this.ao_hdr_B = new Array();
	this.o_hdr_K = null;
	this.ao_hdr_A = new Array();
	this.ao_hdr_Dummy = new Array();
}
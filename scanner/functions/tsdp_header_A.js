function tsdp_header_A(s_field, s_value){
	tsdp_header.call(this, tsdp_header_type_e.A);
	this.s_field = s_field;
	this.s_value = s_value;
}
function tsip_header_Contact(){
	tsip_header.call(this, tsip_header_type_e.Contact);
    this.s_display_name = null;
    this.o_uri = null;
    this.i_expires = -1;
}
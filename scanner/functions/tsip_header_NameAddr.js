function tsip_header_NameAddr(e_type, o_uri, s_tag){
	tsip_header.call(this, e_type);
    this.s_display_name = o_uri ? o_uri.s_display_name : null;
	this.o_uri = o_uri;
	this.s_tag = s_tag;
}
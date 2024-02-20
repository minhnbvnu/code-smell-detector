function tsip_header_Session_Expires(i_delta_seconds, b_refresher_uas){
	tsip_header.call(this, tsip_header_type_e.Session_Expires);
    this.i_delta_seconds = i_delta_seconds;
    this.b_refresher_uas = b_refresher_uas;
}
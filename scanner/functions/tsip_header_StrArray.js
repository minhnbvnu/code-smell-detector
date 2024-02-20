function tsip_header_StrArray(e_type, s_value){
	tsip_header.call(this, e_type);
    this.as_values = new Array();
	if(s_value){
		this.as_values.push(s_value);
	}
}
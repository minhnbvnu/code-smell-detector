function tsip_header_CSeq(i_seq, s_method){
	tsip_header.call(this, tsip_header_type_e.CSeq);
    this.i_seq = i_seq;
    this.s_method = s_method;
	if(s_method){
		this.e_req_type = tsip_message.prototype.GetRequestType(this.s_method);
	}
	else{
		this.e_req_type = tsip_request_type_e.UNKNOWN;
	}
}
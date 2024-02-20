function tsip_response(i_status_code, s_reason_phrase, o_request) {
    if(!s_reason_phrase || !o_request){
        tsk_utils_log_error("Invalid argument");
        return null;
    }
    tsip_message.call(this, tsip_message_type_e.RESPONSE);
	this.line.response.i_status_code = i_status_code;
	this.line.response.s_reason_phrase = s_reason_phrase; 
				
	/* Copy network information */
	this.o_socket = o_request.o_socket;
	this.o_remote_addr = o_request.o_remote_addr;

	/*
	RFC 3261 - 8.2.6.2 Headers and Tags

	The From field of the response MUST equal the From header field of
	the request.  The Call-ID header field of the response MUST equal the
	Call-ID header field of the request.  The CSeq header field of the
	response MUST equal the CSeq field of the request.  The Via header
	field values in the response MUST equal the Via header field values
	in the request and MUST maintain the same ordering.

	If a request contained a To tag in the request, the To header field
	in the response MUST equal that of the request.  However, if the To
	header field in the request did not contain a tag, the URI in the To
	header field in the response MUST equal the URI in the To header
	field; additionally, the UAS MUST add a tag to the To header field in
	the response (with the exception of the 100 (Trying) response, in
	which a tag MAY be present).  This serves to identify the UAS that is
	responding, possibly resulting in a component of a dialog ID.  The
	same tag MUST be used for all responses to that request, both final
	and provisional (again excepting the 100 (Trying)).  Procedures for
	the generation of tags are defined in Section 19.3.
	*/
	this.o_hdr_From = o_request.o_hdr_From;
	this.o_hdr_Call_ID = o_request.o_hdr_Call_ID;
	this.o_hdr_CSeq = o_request.o_hdr_CSeq;
	this.o_hdr_firstVia = o_request.o_hdr_firstVia;
	/* All other VIAs */
	if(this.o_hdr_firstVia){
		var i_index = 1;
		var o_hdr_via;
		while ((o_hdr_via = o_request.get_header_at(tsip_header_type_e.Via, i_index++))) {
			this.add_header(o_hdr_via);
		}
	}
	/* Record routes */
	{
		var i_index = 0;
		var o_hdr_record_route;
		while((o_hdr_record_route = o_request.get_header_at(tsip_header_type_e.Record_Route, i_index++))){
			this.add_header(o_hdr_record_route);
		}
	}
	this.o_hdr_To = o_request.o_hdr_To;
	this.add_header(new tsip_header_Content_Length(0));
}
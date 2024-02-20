function tsip_request(s_method, o_uri_request, o_uri_from, o_uri_to, s_call_id, i_cseq){
    if(!s_method || !o_uri_request || !s_call_id){
        tsk_utils_log_error("Invalid argument");
        return null;
    }

    tsip_message.call(this, tsip_message_type_e.REQUEST);
    this.line.request.s_method = s_method;
    this.line.request.o_uri = o_uri_request;
    this.line.request.e_type = tsip_message.prototype.GetRequestType(s_method);

	/* RFC 3261 8.1.1 Generating the Request
		A valid SIP request formulated by a UAC MUST, at a minimum, contain
		the following header fields: To, From, CSeq, Call-ID, Max-Forwards,
		and Via; all of these header fields are mandatory in all SIP
		requests.  These six header fields are the fundamental building
		blocks of a SIP message, as they jointly provide for most of the
		critical message routing services including the addressing of
		messages, the routing of responses, limiting message propagation,
		ordering of messages, and the unique identification of transactions.
		These header fields are in addition to the mandatory request line,
		which contains the method, Request-URI, and SIP version.
	*/
    this.add_headers( 
        new tsip_header_CSeq(i_cseq, s_method),
        new tsip_header_Call_ID(s_call_id),
        new tsip_header_Max_Forwards(TSIP_HEADER_MAX_FORWARDS_DEFAULT),
        /* Via will be added by the transport layer */
		new tsip_header_Content_Length(0));
    if (o_uri_to) {
        this.add_headers(new tsip_header_To(o_uri_to, null));
    }
    if (o_uri_from) {
        this.add_headers(new tsip_header_From(o_uri_from, null));
    }
}
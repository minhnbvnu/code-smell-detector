function tsip_message(e_type) {
    this.s_version = tsip_message.prototype.__s_version_default; // The SIP version. Only 'SIP/2.0' is supported
    this.e_type = e_type;

    // Request-Line / Response-Line
    this.line = {
        request: {}, // s_method, o_uri
        response: {} // i_status_code, s_reason_phrase
    };

    // Most common headers
    this.o_hdr_firstVia = null;
    this.o_hdr_From = null;
    this.o_hdr_To = null;
    this.o_hdr_Contact = null;
    this.o_hdr_Call_ID = null;
    this.o_hdr_CSeq = null;
    this.o_hdr_Expires = null;

    this.o_hdr_Content_Type = null;
    this.o_hdr_Content_Length = null;

    this.o_content = null;

    // Other headers
    this.ao_headers = new Array();

    // To hack the message
    this.s_sigcomp_id = null;
    this.o_socket = null;
    this.o_remote_addr = null;
    this.b_update = false;
}
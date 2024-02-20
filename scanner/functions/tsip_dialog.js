function tsip_dialog() {
    this.e_type = tsip_dialog_type_e.UNKNOWN;

    this.o_fsm = null;

    this.o_session = null;
    this.o_action_curr = null;

    this.e_state = tsip_dialog_state_e.INITIAL;
    this.b_initialized = false;
    this.b_running = false;

    this.last_error = {};
    this.last_error.s_phrase = null;
    this.last_error.i_code = 0;
    this.last_error.o_message = null;

    this.s_tag_local = null;
    this.o_uri_local = null;
    this.s_tag_remote = null;
    this.o_uri_remote = null;
    this.o_uri_remote_target = null;

    this.i_cseq_value = 0;
    this.s_cseq_method = null;

    this.i_expires = 0; // in milliseconds

    this.s_callid = null;

    this.ao_hdr_record_routes = null;
    this.ao_challenges = null;

    this.fn_callback = null;
}
function tsip_session(o_stack) {
    if (!o_stack) {
        tsk_utils_log_error("Invalid argument");
        return null;
    }

    this.i_id = ++tsip_session.prototype.__i_session_id;
    this.i_id_parent = tsip_session.prototype.__i_session_id_invalid; // for call transfer
    this.b_server = false;

    this.o_stack = o_stack;
    this.o_usr_data = null;

    //=======
	// SIP
    //=======
    this.ao_caps = new Array();
    this.ao_headers = new Array();

    this.o_uri_from = o_stack.identity.o_uri_impu;
    this.o_uri_to = null; // will be set by the dialog
    this.i_expires = tsip_session.prototype.__i_expires_default;
    this.b_silent_hangup = false;
    this.b_no_contact = false;

    //=======
    // Media
    //=======
    this.media = {};
    this.media.e_type = tmedia_type_e.NONE;
    this.media.b_100rel = false;
    this.media.o_bandwidth = o_stack.media.o_bandwidth;
    this.media.o_video_size = o_stack.media.o_video_size;

    this.media.screencast = {};
    this.media.screencast.d_window_id = 0; // Entire desktop

    this.media.timers = {};
    this.media.timers.s_refresher = null;
    this.media.timers.i_timeout = 0;

    this.media.qos = {};
    this.media.qos.e_type = tmedia_qos_stype_e.NONE;
    this.media.qos.e_strength = tmedia_qos_strength_e.NONE;

    this.media.msrp = {};
    this.media.msrp.fn_callback = null;    
}
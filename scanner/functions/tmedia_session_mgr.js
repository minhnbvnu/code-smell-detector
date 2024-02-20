function tmedia_session_mgr(e_type, s_addr, b_ipv6, b_offerer, fn_callback, o_usr_data) {
    this.s_addr = s_addr;
    this.s_public_addr = null;
    this.b_ipv6 = b_ipv6;

    this.fn_callback = fn_callback;
    this.o_usr_data = o_usr_data;

    this.sdp = {};
    this.sdp.i_lo_ver = -1;
    this.sdp.o_lo = null;
    this.sdp.i_ro_ver = -1;
    this.sdp.o_ro = null;

    this.o_stream_local = null;
    this.o_stream_remote = null;

    this.b_started = false;
    this.b_ro_changed = false;
    this.b_lo_changed = false;
    this.b_state_changed = false;
    this.b_media_type_changed = false;

    this.e_type = e_type;
    this.ao_sessions = new Array();
    this.ao_params = new Array();

    if (b_offerer) {
        this.load_sessions();
    }
}
function tmedia_session_roap(o_mgr) {
    this.__proto__.__proto__ = new tmedia_session(tmedia_type_e.AUDIO_VIDEO, o_mgr);
    this.e_state = tmedia_session_state_e.NONE;
    this.o_pc = null;
    this.o_pc_json = null;

    this.o_remote_stream = null;
    this.o_local_stream = null;

    this.o_sdp_json_lo = null;
    this.o_sdp_lo = null;
    this.o_sdp_json_ro = null;
    this.o_sdp_ro = null;

    this.b_ro_changed = false;
    this.b_lo_held = false;
    this.b_ro_held = false;
}
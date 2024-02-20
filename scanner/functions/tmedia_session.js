function tmedia_session(e_type, o_mgr) {
    this.e_type = e_type;
    this.b_ro_changed = false;
    this.b_initialized = false;
    this.b_prepared = false;
    this.b_lo_held = false;
    this.b_ro_held = false;

    this.o_sdp = null;
    this.o_mgr = o_mgr;
}
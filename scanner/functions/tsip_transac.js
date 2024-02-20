function tsip_transac() {
    this.e_type = tsip_transac_type_e.NONE;
    this.o_dialog = null;
    this.o_fsm = null;
    this.b_reliable = true;
    this.b_running = false;
    this.b_initialized = false;
    this.s_branch = null;
    this.i_cseq_value = 0;
    this.s_cseq_method = null;
    this.s_callid = null;
    this.fn_callback = null;
}
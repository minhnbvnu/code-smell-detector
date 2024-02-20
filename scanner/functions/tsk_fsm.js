function tsk_fsm(i_state_curr, i_state_term, fn_onterm, o_usr_data) {
    this.i_state_curr = i_state_curr;
    this.i_state_term = i_state_term;
    this.fn_onterm = fn_onterm;
    this.o_usr_data = o_usr_data;
    this.ao_entries = new Array();
    this.b_debug = false;
}
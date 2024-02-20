function tsk_fsm_entry(i_state_from, i_action, fn_condition, i_state_to, fn_execute, s_description) {
    this.i_state_from = i_state_from;
    this.i_action = i_action;
    this.fn_condition = fn_condition;
    this.i_state_to = i_state_to;
    this.fn_execute = fn_execute;
    this.s_description = s_description;
}
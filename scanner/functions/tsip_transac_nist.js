function tsip_transac_nist(b_reliable, i_cseq_value, s_cseq_method, s_callid, o_dialog) {
    var o_stack;
    if (!o_dialog || !(o_stack = o_dialog.get_stack())) {
        tsk_utils_log_error("Invalid argument");
        return null;
    }
    tsip_transac.call(this);

    this.o_lastResponse = null;

    this.init(tsip_transac_type_e.nist, b_reliable, i_cseq_value, s_cseq_method, s_callid, o_dialog, tsip_transac_nist_states_e.STARTED, tsip_transac_nist_states_e.TERMINATED);
    this.set_callback(__tsip_transac_nist_event_callback);
    this.o_fsm.set_debug_enabled(tsip_transac_nist.prototype.__b_debug_state_machine);
    this.o_fsm.set_onterm_callback(__tsip_transac_nist_onterm, this);

    /* Timers */
    this.o_timerJ = null;
    this.i_timerJ = b_reliable ? 0 : o_stack.o_timers.getJ(); /* RFC 3261 - 17.2.2*/


    // initialize the state machine
    this.o_fsm.set(
        /*=======================
        * === Started === 
        */
        // Started -> (receive request) -> Trying
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nist_states_e.STARTED, tsip_transac_nist_actions_e.RECV_REQUEST, tsip_transac_nist_states_e.TRYING, tsip_transac_nist_Started_2_Trying_X_request, "tsip_transac_nist_Started_2_Trying_X_request"),
        // Started -> (Any other) -> Started
        tsk_fsm_entry.prototype.CreateAlwaysNothing(tsip_transac_nist_states_e.STARTED, "tsip_transac_nist_Started_2_Started_X_any"),

        /*=======================
        * === Trying === 
        */
        // Trying -> (send 1xx) -> Proceeding
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nist_states_e.TRYING, tsip_transac_nist_actions_e.SEND_1XX, tsip_transac_nist_states_e.PROCEEDING, tsip_transac_nist_Trying_2_Proceeding_X_send_1xx, "tsip_transac_nist_Trying_2_Proceeding_X_send_1xx"),
        // Trying -> (send 200 to 699) -> Completed
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nist_states_e.TRYING, tsip_transac_nist_actions_e.SEND_200_to_699, tsip_transac_nist_states_e.COMPLETED, tsip_transac_nist_Trying_2_Completed_X_send_200_to_699, "tsip_transac_nist_Trying_2_Completed_X_send_200_to_699"),

        /*=======================
        * === Proceeding === 
        */
        // Proceeding -> (send 1xx) -> Proceeding
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nist_states_e.PROCEEDING, tsip_transac_nist_actions_e.SEND_1XX, tsip_transac_nist_states_e.PROCEEDING, tsip_transac_nist_Proceeding_2_Proceeding_X_send_1xx, "tsip_transac_nist_Proceeding_2_Proceeding_X_send_1xx"),
        // Proceeding -> (send 200 to 699) -> Completed
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nist_states_e.PROCEEDING, tsip_transac_nist_actions_e.SEND_200_to_699, tsip_transac_nist_states_e.COMPLETED, tsip_transac_nist_Proceeding_2_Completed_X_send_200_to_699, "tsip_transac_nist_Proceeding_2_Completed_X_send_200_to_699"),
        // Proceeding -> (receive request) -> Proceeding
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nist_states_e.PROCEEDING, tsip_transac_nist_actions_e.RECV_REQUEST, tsip_transac_nist_states_e.PROCEEDING, tsip_transac_nist_Proceeding_2_Proceeding_X_request, "tsip_transac_nist_Proceeding_2_Proceeding_X_request"),

        /*=======================
        * === Completed === 
        */
        // Completed -> (receive request) -> Completed
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nist_states_e.COMPLETED, tsip_transac_nist_actions_e.RECV_REQUEST, tsip_transac_nist_states_e.COMPLETED, tsip_transac_nist_Completed_2_Completed_X_request, "tsip_transac_nist_Completed_2_Completed_X_request"),
        // Completed -> (timer J) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nist_states_e.COMPLETED, tsip_transac_nist_actions_e.TIMER_J, tsip_transac_nist_states_e.TERMINATED, tsip_transac_nist_Completed_2_Terminated_X_tirmerJ, "tsip_transac_nist_Completed_2_Terminated_X_tirmerJ"),

        /*=======================
        * === Any === 
        */
        // Any -> (transport error) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_transac_nist_actions_e.TRANSPORT_ERROR, tsip_transac_nist_states_e.TERMINATED, tsip_transac_nist_Any_2_Terminated_X_transportError, "tsip_transac_nist_Any_2_Terminated_X_transportError"),
        // Any -> (transport error) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_transac_nist_actions_e.ERROR, tsip_transac_nist_states_e.TERMINATED, tsip_transac_nist_Any_2_Terminated_X_Error, "tsip_transac_nist_Any_2_Terminated_X_Error"),
        // Any -> (cancel) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_transac_nist_actions_e.CANCEL, tsip_transac_nist_states_e.TERMINATED, tsip_transac_nist_Any_2_Terminated_X_cancel, "tsip_transac_nist_Any_2_Terminated_X_cancel")
    );
}
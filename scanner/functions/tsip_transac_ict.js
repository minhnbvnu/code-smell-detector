function tsip_transac_ict(b_reliable, i_cseq_value, s_callid, o_dialog) {
    var o_stack;
    if (!o_dialog || !(o_stack = o_dialog.get_stack())) {
        tsk_utils_log_error("Invalid argument");
        return null;
    }
    tsip_transac.call(this);

    this.init(tsip_transac_type_e.ICT, b_reliable, i_cseq_value, "INVITE", s_callid, o_dialog, tsip_transac_ict_states_e.STARTED, tsip_transac_ict_states_e.TERMINATED);
    this.set_callback(__tsip_transac_ict_event_callback);
    this.o_fsm.set_debug_enabled(tsip_transac_ict.prototype.__b_debug_state_machine);
    this.o_fsm.set_onterm_callback(__tsip_transac_ict_onterm, this);

    /* Timers */
    this.o_timerA = null;
    this.o_timerB = null;
    this.o_timerD = null;
    this.o_timerM = null;

    this.i_timerA = o_stack.o_timers.getA();
    this.i_timerB = o_stack.o_timers.getB();
    this.i_timerD = b_reliable ? 0 : o_stack.o_timers.getD();
    this.i_timerM = o_stack.o_timers.getM();

    // initialize the state machine
    this.o_fsm.set(
        /*=======================
        * === Started === 
        */
        // Started -> (Send) -> Calling
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ict_states_e.STARTED, tsip_transac_ict_actions_e.SEND, tsip_transac_ict_states_e.CALLING, __tsip_transac_ict_Started_2_Calling_X_send, "tsip_transac_ict_Started_2_Calling_X_send"),
        // Started -> (Any) -> Started
        tsk_fsm_entry.prototype.CreateAlwaysNothing(tsip_transac_ict_states_e.STARTED, "tsip_transac_ict_Started_2_Started_X_any"),

        /*=======================
        * === Calling === 
        */
        // Calling -> (timerA) -> Calling
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ict_states_e.CALLING, tsip_transac_ict_actions_e.TIMER_A, tsip_transac_ict_states_e.CALLING, __tsip_transac_ict_Calling_2_Calling_X_timerA, "tsip_transac_ict_Calling_2_Calling_X_timerA"),
        // Calling -> (timerB) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ict_states_e.CALLING, tsip_transac_ict_actions_e.TIMER_B, tsip_transac_ict_states_e.TERMINATED, __tsip_transac_ict_Calling_2_Terminated_X_timerB, "tsip_transac_ict_Calling_2_Terminated_X_timerB"),
        // Calling -> (300-699) -> Completed
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ict_states_e.CALLING, tsip_transac_ict_actions_e.I_300_to_699, tsip_transac_ict_states_e.COMPLETED, __tsip_transac_ict_Calling_2_Completed_X_300_to_699, "tsip_transac_ict_Calling_2_Completed_X_300_to_699"),
        // Calling  -> (1xx) -> Proceeding
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ict_states_e.CALLING, tsip_transac_ict_actions_e.I_1XX, tsip_transac_ict_states_e.PROCEEDING, __tsip_transac_ict_Calling_2_Proceeding_X_1xx, "tsip_transac_ict_Calling_2_Proceeding_X_1xx"),
        // Calling  -> (2xx) -> Accepted
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ict_states_e.CALLING, tsip_transac_ict_actions_e.I_2XX, tsip_transac_ict_states_e.ACCEPTED, __tsip_transac_ict_Calling_2_Accepted_X_2xx, "tsip_transac_ict_Calling_2_Accepted_X_2xx"),

        /*=======================
        * === Proceeding === 
        */
        // Proceeding -> (1xx) -> Proceeding
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ict_states_e.PROCEEDING, tsip_transac_ict_actions_e.I_1XX, tsip_transac_ict_states_e.PROCEEDING, __tsip_transac_ict_Proceeding_2_Proceeding_X_1xx, "tsip_transac_ict_Proceeding_2_Proceeding_X_1xx"),
        // Proceeding -> (300-699) -> Completed
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ict_states_e.PROCEEDING, tsip_transac_ict_actions_e.I_300_to_699, tsip_transac_ict_states_e.COMPLETED, __tsip_transac_ict_Proceeding_2_Completed_X_300_to_699, "tsip_transac_ict_Proceeding_2_Completed_X_300_to_699"),
        // Proceeding -> (2xx) -> Accepted
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ict_states_e.PROCEEDING, tsip_transac_ict_actions_e.I_2XX, tsip_transac_ict_states_e.ACCEPTED, __tsip_transac_ict_Proceeding_2_Accepted_X_2xx, "tsip_transac_ict_Proceeding_2_Accepted_X_2xx"),

        /*=======================
        * === Completed === 
        */
        // Completed -> (300-699) -> Completed
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ict_states_e.COMPLETED, tsip_transac_ict_actions_e.I_300_to_699, tsip_transac_ict_states_e.COMPLETED, __tsip_transac_ict_Completed_2_Completed_X_300_to_699, "tsip_transac_ict_Completed_2_Completed_X_300_to_699"),
        // Completed -> (timerD) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ict_states_e.COMPLETED, tsip_transac_ict_actions_e.TIMER_D, tsip_transac_ict_states_e.TERMINATED, __tsip_transac_ict_Completed_2_Terminated_X_timerD, "tsip_transac_ict_Completed_2_Terminated_X_timerD"),

        /*=======================
        * === Accepted === 
        */
        // Accepted -> (2xx) -> Accepted
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ict_states_e.ACCEPTED, tsip_transac_ict_actions_e.I_2XX, tsip_transac_ict_states_e.ACCEPTED, __tsip_transac_ict_Accepted_2_Accepted_X_2xx, "tsip_transac_ict_Accepted_2_Accepted_X_2xx"),
        // Accepted -> (timerM) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ict_states_e.ACCEPTED, tsip_transac_ict_actions_e.TIMER_M, tsip_transac_ict_states_e.TERMINATED, __tsip_transac_ict_Accepted_2_Terminated_X_timerM, "tsip_transac_ict_Accepted_2_Terminated_X_timerM"),

        /*=======================
        * === Any === 
        */
        // Any -> (transport error) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_transac_ict_actions_e.TRANSPORT_ERROR, tsip_transac_ict_states_e.TERMINATED, __tsip_transac_ict_Any_2_Terminated_X_transportError, "tsip_transac_ict_Any_2_Terminated_X_transportError"),
        // Any -> (transport error) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_transac_ict_actions_e.ERROR, tsip_transac_ict_states_e.TERMINATED, __tsip_transac_ict_Any_2_Terminated_X_Error, "tsip_transac_ict_Any_2_Terminated_X_Error"),
        // Any -> (cancel) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_transac_ict_actions_e.CANCEL, tsip_transac_ict_states_e.TERMINATED, __tsip_transac_ict_Any_2_Terminated_X_cancel, "tsip_transac_ict_Any_2_Terminated_X_cancel")
    );
}
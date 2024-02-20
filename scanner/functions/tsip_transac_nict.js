function tsip_transac_nict(b_reliable, i_cseq_value, s_cseq_method, s_callid, o_dialog) {
    var o_stack;
    if(!o_dialog || !(o_stack = o_dialog.get_stack())){
        tsk_utils_log_error("Invalid argument");
        return null;
    }
    tsip_transac.call(this);
    this.o_request = null;

    this.init(tsip_transac_type_e.NICT, b_reliable, i_cseq_value, s_cseq_method, s_callid, o_dialog, tsip_transac_nict_states_e.STARTED, tsip_transac_nict_states_e.TERMINATED);
    this.set_callback(__tsip_transac_nict_event_callback);
    this.o_fsm.set_debug_enabled(tsip_transac_nict.prototype.__b_debug_state_machine);
    this.o_fsm.set_onterm_callback(__tsip_transac_nict_onterm, this);

    /* Timers */
	this.o_timerE = null;
	this.o_timerF = null;
	this.o_timerK = null;

	this.i_timerE = o_stack.o_timers.getE();
	this.i_timerF = o_stack.o_timers.getF();
	this.i_timerK = b_reliable ? 0 : o_stack.o_timers.getK(); /* RFC 3261 - 17.1.2.2*/

	// initialize the state machine
	this.o_fsm.set(
	    /*=======================
	    * === Started === 
	    */
	    // Started -> (Send) -> Trying
	    tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nict_states_e.STARTED, tsip_transac_nict_actions_e.SEND, tsip_transac_nict_states_e.TRYING, __tsip_transac_nict_Started_2_Trying_X_send, "__tsip_transac_nict_Started_2_Trying_X_send"),
	    // Started -> (Any) -> Started
	    tsk_fsm_entry.prototype.CreateAlwaysNothing(tsip_transac_nict_states_e.STARTED, "tsip_transac_nict_Started_2_Started_X_any"),

	    /*=======================
	    * === Trying === 
	    */
	    // Trying -> (timerE) -> Trying
	    tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nict_states_e.TRYING, tsip_transac_nict_actions_e.TIMER_E, tsip_transac_nict_states_e.TRYING, __tsip_transac_nict_Trying_2_Trying_X_timerE, "__tsip_transac_nict_Trying_2_Trying_X_timerE"),
	    // Trying -> (timerF) -> Terminated
	    tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nict_states_e.TRYING, tsip_transac_nict_actions_e.TIMER_F, tsip_transac_nict_states_e.TERMINATED, __tsip_transac_nict_Trying_2_Terminated_X_timerF, "__tsip_transac_nict_Trying_2_Terminated_X_timerF"),
	    // Trying -> (transport error) -> Terminated
	    tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nict_states_e.TRYING, tsip_transac_nict_actions_e.TRANSPORT_ERROR, tsip_transac_nict_states_e.TERMINATED, __tsip_transac_nict_Trying_2_Terminated_X_transportError, "__tsip_transac_nict_Trying_2_Terminated_X_transportError"),
	    // Trying  -> (1xx) -> Proceeding
	    tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nict_states_e.TRYING, tsip_transac_nict_actions_e.I_1xx, tsip_transac_nict_states_e.PROCEEDING, __tsip_transac_nict_Trying_2_Proceedding_X_1xx, "__tsip_transac_nict_Trying_2_Proceedding_X_1xx"),
	    // Trying  -> (200 to 699) -> Completed
	    tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nict_states_e.TRYING, tsip_transac_nict_actions_e.I_200_to_699, tsip_transac_nict_states_e.COMPLETED, __tsip_transac_nict_Trying_2_Completed_X_200_to_699, "__tsip_transac_nict_Trying_2_Completed_X_200_to_699"),

	    /*=======================
	    * === Proceeding === 
	    */
	    // Proceeding -> (timerE) -> Proceeding
	    tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nict_states_e.PROCEEDING, tsip_transac_nict_actions_e.TIMER_E, tsip_transac_nict_states_e.PROCEEDING, __tsip_transac_nict_Proceeding_2_Proceeding_X_timerE, "__tsip_transac_nict_Proceeding_2_Proceeding_X_timerE"),
	    // Proceeding -> (timerF) -> Terminated
	    tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nict_states_e.PROCEEDING, tsip_transac_nict_actions_e.TIMER_F, tsip_transac_nict_states_e.TERMINATED, __tsip_transac_nict_Proceeding_2_Terminated_X_timerF, "__tsip_transac_nict_Proceeding_2_Terminated_X_timerF"),
	    // Proceeding -> (transport error) -> Terminated
	    tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nict_states_e.PROCEEDING, tsip_transac_nict_actions_e.TRANSPORT_ERROR, tsip_transac_nict_states_e.TERMINATED, __tsip_transac_nict_Proceeding_2_Terminated_X_transportError, "__tsip_transac_nict_Proceeding_2_Terminated_X_transportError"),
	    // Proceeding -> (1xx) -> Proceeding
	    tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nict_states_e.PROCEEDING, tsip_transac_nict_actions_e.I_1xx, tsip_transac_nict_states_e.PROCEEDING, __tsip_transac_nict_Proceeding_2_Proceeding_X_1xx, "__tsip_transac_nict_Proceeding_2_Proceeding_X_1xx"),
	    // Proceeding -> (200 to 699) -> Completed
	    tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nict_states_e.PROCEEDING, tsip_transac_nict_actions_e.I_200_to_699, tsip_transac_nict_states_e.COMPLETED, __tsip_transac_nict_Proceeding_2_Completed_X_200_to_699, "__tsip_transac_nict_Proceeding_2_Completed_X_200_to_699"),

	    /*=======================
	    * === Completed === 
	    */
	    // Completed -> (timer K) -> Terminated
	    tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nict_states_e.COMPLETED, tsip_transac_nict_actions_e.TIMER_K, tsip_transac_nict_states_e.TERMINATED, __tsip_transac_nict_Completed_2_Terminated_X_timerK, "__tsip_transac_nict_Completed_2_Terminated_X_timerK"),

	    /*=======================
	    * === Any === 
	    */
	    // Any -> (transport error) -> Terminated
	    tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_transac_nict_actions_e.TRANSPORT_ERROR, tsip_transac_nict_states_e.TERMINATED, __tsip_transac_nict_Any_2_Terminated_X_transportError, "__tsip_transac_nict_Any_2_Terminated_X_transportError"),
	    // Any -> (error) -> Terminated
	    tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_transac_nict_actions_e.ERROR, tsip_transac_nict_states_e.TERMINATED, __tsip_transac_nict_Any_2_Terminated_X_Error, "__tsip_transac_nict_Any_2_Terminated_X_Error"),
	    // Any -> (cancel) -> Terminated
	    tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_transac_nict_actions_e.CANCEL, tsip_transac_nict_states_e.TERMINATED, __tsip_transac_nict_Any_2_Terminated_X_cancel, "__tsip_transac_nict_Any_2_Terminated_X_cancel")

	);
}
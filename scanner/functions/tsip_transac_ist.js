function tsip_transac_ist(b_reliable, i_cseq_value, s_callid, o_dialog) {
    var o_stack;
    if (!o_dialog || !(o_stack = o_dialog.get_stack())) {
        tsk_utils_log_error("Invalid argument");
        return null;
    }
    tsip_transac.call(this);

    this.o_lastResponse = null;

    this.init(tsip_transac_type_e.IST, b_reliable, i_cseq_value, "INVITE", s_callid, o_dialog, tsip_transac_ist_states_e.STARTED, tsip_transac_ist_states_e.TERMINATED);
    this.set_callback(__tsip_transac_ist_event_callback);
    this.o_fsm.set_debug_enabled(tsip_transac_ist.prototype.__b_debug_state_machine);
    this.o_fsm.set_onterm_callback(__tsip_transac_ist_onterm, this);

    /* Timers */
    this.o_timerH = null;
    this.o_timerI = null;
    this.o_timerG = null;
    this.o_timerL = null;
    this.o_timerX = null;

    this.i_timerH = o_stack.o_timers.getH();
    this.i_timerI = b_reliable ? 0 : o_stack.o_timers.getI();
    this.i_timerG = o_stack.o_timers.getG();
    this.i_timerL = o_stack.o_timers.getL();
    this.i_timerX = o_stack.o_timers.getG();

    // initialize the state machine
    this.o_fsm.set(

        /*=======================
		* === Started === 
		*/
		// Started -> (recv INVITE) -> Proceeding
		tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ist_states_e.STARTED, tsip_transac_ist_actions_e.RECV_INVITE, tsip_transac_ist_states_e.PROCEEDING, __tsip_transac_ist_Started_2_Proceeding_X_INVITE, "tsip_transac_ist_Started_2_Proceeding_X_INVITE"),
		// Started -> (Any other) -> Started
		tsk_fsm_entry.prototype.CreateAlwaysNothing(tsip_transac_ist_states_e.STARTED, "tsip_transac_ist_Started_2_Started_X_any"),

		/*=======================
		* === Proceeding === 
		*/
		// Proceeding -> (recv INVITE) -> Proceeding
		tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ist_states_e.PROCEEDING, tsip_transac_ist_actions_e.RECV_INVITE, tsip_transac_ist_states_e.PROCEEDING, __tsip_transac_ist_Proceeding_2_Proceeding_X_INVITE, "tsip_transac_ist_Proceeding_2_Proceeding_X_INVITE"),
		// Proceeding -> (send 1xx) -> Proceeding
		tsk_fsm_entry.prototype.Create(tsip_transac_ist_states_e.PROCEEDING, tsip_transac_ist_actions_e.SEND_1XX, __tsip_transac_ist_cond_is_resp2invite, tsip_transac_ist_states_e.PROCEEDING, __tsip_transac_ist_Proceeding_2_Proceeding_X_1xx, "tsip_transac_ist_Proceeding_2_Proceeding_X_1xx"),
		// Proceeding -> (send 300to699) -> Completed
		tsk_fsm_entry.prototype.Create(tsip_transac_ist_states_e.PROCEEDING, tsip_transac_ist_actions_e.SEND_300_to_699, __tsip_transac_ist_cond_is_resp2invite, tsip_transac_ist_states_e.COMPLETED, __tsip_transac_ist_Proceeding_2_Completed_X_300_to_699, "tsip_transac_ist_Proceeding_2_Completed_X_300_to_699"),
		// Proceeding -> (send 2xx) -> Accepted
		tsk_fsm_entry.prototype.Create(tsip_transac_ist_states_e.PROCEEDING, tsip_transac_ist_actions_e.SEND_2XX, __tsip_transac_ist_cond_is_resp2invite, tsip_transac_ist_states_e.ACCEPTED, __tsip_transac_ist_Proceeding_2_Accepted_X_2xx, "tsip_transac_ist_Proceeding_2_Accepted_X_2xx"),

		/*=======================
		* === Completed === 
		*/
		// Completed -> (recv INVITE) -> Completed
		tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ist_states_e.COMPLETED, tsip_transac_ist_actions_e.RECV_INVITE, tsip_transac_ist_states_e.COMPLETED, __tsip_transac_ist_Completed_2_Completed_INVITE, "tsip_transac_ist_Completed_2_Completed_INVITE"),
		// Completed -> (timer G) -> Completed
		tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ist_states_e.COMPLETED, tsip_transac_ist_actions_e.TIMER_G, tsip_transac_ist_states_e.COMPLETED, __tsip_transac_ist_Completed_2_Completed_timerG, "tsip_transac_ist_Completed_2_Completed_timerG"),
		// Completed -> (timerH) -> Terminated
		tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ist_states_e.COMPLETED, tsip_transac_ist_actions_e.TIMER_H, tsip_transac_ist_states_e.TERMINATED, __tsip_transac_ist_Completed_2_Terminated_timerH, "tsip_transac_ist_Completed_2_Terminated_timerH"),
		// Completed -> (recv ACK) -> Confirmed
		tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ist_states_e.COMPLETED, tsip_transac_ist_actions_e.RECV_ACK, tsip_transac_ist_states_e.CONFIRMED, __tsip_transac_ist_Completed_2_Confirmed_ACK, "tsip_transac_ist_Completed_2_Confirmed_ACK"),
			
		/*=======================
		* === Accepted === 
		*/
		// Accepted -> (recv INVITE) -> Accepted
		tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ist_states_e.ACCEPTED, tsip_transac_ist_actions_e.RECV_INVITE, tsip_transac_ist_states_e.ACCEPTED, __tsip_transac_ist_Accepted_2_Accepted_INVITE, "tsip_transac_ist_Accepted_2_Accepted_INVITE"),
		// Accepted -> (send 2xx) -> Accepted
		tsk_fsm_entry.prototype.Create(tsip_transac_ist_states_e.ACCEPTED, tsip_transac_ist_actions_e.SEND_2XX, __tsip_transac_ist_cond_is_resp2invite, tsip_transac_ist_states_e.ACCEPTED, __tsip_transac_ist_Accepted_2_Accepted_2xx, "tsip_transac_ist_Accepted_2_Accepted_2xx"),
        // Accepted -> (timer X) -> Accepted
		tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ist_states_e.ACCEPTED, tsip_transac_ist_actions_e.TIMER_X, tsip_transac_ist_states_e.ACCEPTED, __tsip_transac_ist_Accepted_2_Accepted_timerX, "tsip_transac_ist_Accepted_2_Accepted_timerX"),
        // Accepted -> (recv ACK) -> Accepted
		tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ist_states_e.ACCEPTED, tsip_transac_ist_actions_e.RECV_ACK, tsip_transac_ist_states_e.ACCEPTED, __tsip_transac_ist_Accepted_2_Accepted_iACK, "tsip_transac_ist_Accepted_2_Accepted_iACK"),
		// Accepted -> (timerL) -> Terminated
		tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ist_states_e.ACCEPTED, tsip_transac_ist_actions_e.TIMER_L, tsip_transac_ist_states_e.TERMINATED, __tsip_transac_ist_Accepted_2_Terminated_timerL, "tsip_transac_ist_Accepted_2_Terminated_timerL"),

		/*=======================
		* === Confirmed === 
		*/
		// Confirmed -> (timerI) -> Terminated
		tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ist_states_e.CONFIRMED, tsip_transac_ist_actions_e.TIMER_I, tsip_transac_ist_states_e.TERMINATED, __tsip_transac_ist_Confirmed_2_Terminated_timerI, "tsip_transac_ist_Confirmed_2_Terminated_timerI"),


		/*=======================
		* === Any === 
		*/
		// Any -> (transport error) -> Terminated
		tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_transac_ist_actions_e.TRANSPORT_ERROR, tsip_transac_ist_states_e.TERMINATED, __tsip_transac_ist_Any_2_Terminated_X_transportError, "tsip_transac_ist_Any_2_Terminated_X_transportError"),
		// Any -> (error) -> Terminated
		tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_transac_ist_actions_e.ERROR, tsip_transac_ist_states_e.TERMINATED, __tsip_transac_ist_Any_2_Terminated_X_Error, "tsip_transac_ist_Any_2_Terminated_X_Error"),
		// Any -> (cancel) -> Terminated
		tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_transac_ist_actions_e.CANCEL, tsip_transac_ist_states_e.TERMINATED, __tsip_transac_ist_Any_2_Terminated_X_cancel, "tsip_transac_ist_Any_2_Terminated_X_cancel")
    );
}
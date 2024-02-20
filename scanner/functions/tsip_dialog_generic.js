function tsip_dialog_generic(e_type, o_session, s_call_id) {
    tsip_dialog.call(this);

    this.b_disconnecting = false;
    this.o_last_iMessage = null;

    this.o_timerRefresh = null;
    this.o_timerShutdown = null;
    this.i_timerShutdown = (tsip_dialog.prototype.__i_timer_shutdown << 1) / 3;

    this.init(e_type, s_call_id, o_session, tsip_dialog_generic_states_e.STARTED, tsip_dialog_generic_states_e.TERMINATED);
    this.set_callback(__tsip_dialog_generic_event_callback);
    this.o_fsm.set_debug_enabled(tsip_dialog_generic.prototype.__b_debug_state_machine);
    this.o_fsm.set_onterm_callback(__tsip_dialog_generic_onterm, this);


    // initialize state machines
    this.init_message(); // MESSAGE Dialog
    this.init_publish(); // PUBLISH Dialog
    this.init_subscribe(); // SUBSCRIBE DIALOG
    this.o_fsm.set(
        /*=======================
        * === Started === 
        */
        // Up to each dialog (MESSAGE, PUBLISH, SUBSCRIBE...)


        /*=======================
        * === InProgress === 
        */
        // InProgress -> (1xx) -> InProgress
        tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_generic_states_e.INPROGRESS, tsip_dialog_generic_actions_e.I_1XX, tsip_dialog_generic_states_e.INPROGRESS, tsip_dialog_generic_InProgress_2_InProgress_X_1xx, "tsip_dialog_generic_InProgress_2_InProgress_X_1xx"),
        
        // InProgress -> (2xx dialogless) -> Terminated
        tsk_fsm_entry.prototype.Create(tsip_dialog_generic_states_e.INPROGRESS, tsip_dialog_generic_actions_e.I_2XX, __tsip_dialog_generic_cond_is_dialogless, tsip_dialog_generic_states_e.TERMINATED, tsip_dialog_generic_InProgress_2_Terminated_X_2xx, "tsip_dialog_generic_InProgress_2_Terminated_X_2xx"),
        // InProgress -> (2xx disconnecting) -> Terminated
        tsk_fsm_entry.prototype.Create(tsip_dialog_generic_states_e.INPROGRESS, tsip_dialog_generic_actions_e.I_2XX, __tsip_dialog_generic_cond_is_disconnecting, tsip_dialog_generic_states_e.TERMINATED, tsip_dialog_generic_InProgress_2_Terminated_X_2xx, "tsip_dialog_generic_InProgress_2_Terminated_X_2xx"),
        // InProgress -> (2xx dialogfull and connecting) -> Connected
        tsk_fsm_entry.prototype.Create(tsip_dialog_generic_states_e.INPROGRESS, tsip_dialog_generic_actions_e.I_2XX, __tsip_dialog_generic_cond_is_dialogfull, tsip_dialog_generic_states_e.CONNECTED, tsip_dialog_generic_InProgress_2_Connected_X_2xx, "tsip_dialog_generic_InProgress_2_Connected_X_2xx"),
        // InProgress -> (401/407/421/494) -> InProgress
        tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_generic_states_e.INPROGRESS, tsip_dialog_generic_actions_e.I_401_407_421_494, tsip_dialog_generic_states_e.INPROGRESS, tsip_dialog_generic_InProgress_2_InProgress_X_401_407_421_494, "tsip_dialog_generic_InProgress_2_InProgress_X_401_407_421_494"),
        // InProgress -> (300_to_699) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_generic_states_e.INPROGRESS, tsip_dialog_generic_actions_e.I_300_to_699, tsip_dialog_generic_states_e.TERMINATED, tsip_dialog_generic_InProgress_2_Terminated_X_300_to_699, "tsip_dialog_generic_InProgress_2_Terminated_X_300_to_699"),
        // InProgress -> (cancel) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_generic_states_e.INPROGRESS, tsip_dialog_generic_actions_e.CANCEL, tsip_dialog_generic_states_e.TERMINATED, tsip_dialog_generic_InProgress_2_Terminated_X_cancel, "tsip_dialog_generic_InProgress_2_Terminated_X_cancel"),
        // InProgress -> (shutdown) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_generic_states_e.INPROGRESS, tsip_dialog_generic_actions_e.SHUTDOWN, tsip_dialog_generic_states_e.TERMINATED, null, "tsip_dialog_generic_InProgress_2_Terminated_X_shutdown"),
        // InProgress -> (Any) -> InProgress
        // tsk_fsm_entry.prototype.CreateAlwaysNothing(tsip_dialog_generic_states_e.INPROGRESS, "tsip_dialog_generic_InProgress_2_InProgress_X_any"),

        /*=======================
        * === Incoming === 
        */
        // Incoming -> (accept) -> Terminated
        tsk_fsm_entry.prototype.Create(tsip_dialog_generic_states_e.INCOMING, tsip_dialog_generic_actions_e.ACCEPT, __tsip_dialog_generic_cond_is_dialogless, tsip_dialog_generic_states_e.TERMINATED, tsip_dialog_generic_Incoming_2_Terminated_X_accept, "tsip_dialog_generic_Incoming_2_Terminated_X_accept"),
        // Incoming -> (accept) -> Connected
        tsk_fsm_entry.prototype.Create(tsip_dialog_generic_states_e.INCOMING, tsip_dialog_generic_actions_e.ACCEPT, __tsip_dialog_generic_cond_is_dialogfull, tsip_dialog_generic_states_e.CONNECTED, tsip_dialog_generic_Incoming_2_Connected_X_accept, "tsip_dialog_generic_Incoming_2_Connected_X_accept"),
        // Incoming -> (rejected) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_generic_states_e.INCOMING, tsip_dialog_generic_actions_e.REJECT, tsip_dialog_generic_states_e.TERMINATED, tsip_dialog_generic_Incoming_2_Terminated_X_reject, "tsip_dialog_generic_Incoming_2_Terminated_X_reject"),
        // Incoming -> (Any) -> Incoming
        tsk_fsm_entry.prototype.CreateAlwaysNothing(tsip_dialog_generic_states_e.INCOMING, "tsip_dialog_generic_Incoming_2_Incoming_X_any"),

        /*=======================
        * === Any === 
        */
        // Any -> (hangup) -> InProgress
		tsk_fsm_entry.prototype.Create(tsk_fsm.prototype.__i_state_any, tsip_dialog_generic_actions_e.HANGUP, __tsip_dialog_generic_cond_not_silent_hangup, tsip_dialog_generic_states_e.INPROGRESS, __tsip_dialog_generic_Any_2_InProgress_X_hangup, "tsip_dialog_generic_Any_2_InProgress_X_hangup"),
        // Any -> (silenthangup) -> Terminated
		tsk_fsm_entry.prototype.Create(tsk_fsm.prototype.__i_state_any, tsip_dialog_generic_actions_e.HANGUP, __tsip_dialog_generic_cond_silent_hangup, tsip_dialog_generic_states_e.TERMINATED, null, "tsip_dialog_generic_Any_2_InProgress_X_silenthangup"),
        // Any -> (shutdown) -> InProgress
		tsk_fsm_entry.prototype.Create(tsk_fsm.prototype.__i_state_any, tsip_dialog_generic_actions_e.SHUTDOWN, __tsip_dialog_generic_cond_not_silent_shutdown, tsip_dialog_generic_states_e.INPROGRESS, __tsip_dialog_generic_Any_2_InProgress_X_shutdown, "tsip_dialog_generic_Any_2_InProgress_X_shutdown"),
		// Any -> (silentshutdown) -> Terminated
		tsk_fsm_entry.prototype.Create(tsk_fsm.prototype.__i_state_any, tsip_dialog_generic_actions_e.SHUTDOWN, __tsip_dialog_generic_cond_silent_shutdown, tsip_dialog_generic_states_e.TERMINATED, null, "tsip_dialog_generic_Any_2_InProgress_X_silentshutdown"),
		// Any -> (shutdown timedout) -> Terminated
		tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_generic_actions_e.SHUTDOWN_TIMEDOUT, tsip_dialog_generic_states_e.TERMINATED, null, "tsip_dialog_generic_shutdown_timedout"),
        // Any -> (transport error) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_generic_actions_e.TRANSPORT_ERROR, tsip_dialog_generic_states_e.TERMINATED, tsip_dialog_generic_Any_2_Terminated_X_transportError, "tsip_dialog_generic_Any_2_Terminated_X_transportError"),
        // Any -> (error) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_generic_actions_e.ERROR, tsip_dialog_generic_states_e.TERMINATED, tsip_dialog_generic_Any_2_Terminated_X_Error, "tsip_dialog_generic_Any_2_Terminated_X_Error")

    );
}
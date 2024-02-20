function tsip_dialog_register(o_session, s_call_id) {
    tsip_dialog.call(this);
    this.o_last_iRegister = null;
    this.b_unregistering = false;
    this.b_is_server = false;

    this.o_timerRefresh = null;
    this.o_timerShutdown = null;
    this.i_timerShutdown = (tsip_dialog.prototype.__i_timer_shutdown << 1) / 3;

    this.init(tsip_dialog_type_e.REGISTER, s_call_id, o_session, tsip_dialog_register_states_e.STARTED, tsip_dialog_register_states_e.TERMINATED);
    this.set_callback(__tsip_dialog_register_event_callback);
    this.o_fsm.set_debug_enabled(tsip_dialog_register.prototype.__b_debug_state_machine);
    this.o_fsm.set_onterm_callback(__tsip_dialog_register_onterm, this);

    // initialize state machine
    this.o_fsm.set(
            /*=======================
			* === Started === 
			*/
			// Started -> (REGISTER) -> InProgress
			tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_register_states_e.STARTED, tsip_dialog_register_actions_e.O_REGISTER, tsip_dialog_register_states_e.INPROGRESS, __tsip_dialog_register_Started_2_InProgress_X_oRegister, "tsip_dialog_register_Started_2_InProgress_X_oRegister"),

			/*=======================
			* === InProgress === 
			*/
			// InProgress -> (1xx) -> InProgress
			tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_register_states_e.INPROGRESS, tsip_dialog_register_actions_e.I_1XX, tsip_dialog_register_states_e.INPROGRESS, __tsip_dialog_register_InProgress_2_InProgress_X_1xx, "tsip_dialog_register_InProgress_2_InProgress_X_1xx"),
			// InProgress -> (2xx) -> Terminated
			tsk_fsm_entry.prototype.Create(tsip_dialog_register_states_e.INPROGRESS, tsip_dialog_register_actions_e.I_2XX, __tsip_dialog_register_cond_client_unregistering, tsip_dialog_register_states_e.TERMINATED, __tsip_dialog_register_InProgress_2_Terminated_X_2xx, "tsip_dialog_register_InProgress_2_Terminated_X_2xx"),
            // InProgress -> (2xx) -> Connected
			tsk_fsm_entry.prototype.Create(tsip_dialog_register_states_e.INPROGRESS, tsip_dialog_register_actions_e.I_2XX, __tsip_dialog_register_cond_client_registering, tsip_dialog_register_states_e.CONNECTED, __tsip_dialog_register_InProgress_2_Connected_X_2xx, "tsip_dialog_register_InProgress_2_Connected_X_2xx"),
			// InProgress -> (401/407/421/494) -> InProgress
			tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_register_states_e.INPROGRESS, tsip_dialog_register_actions_e.I_401_407_421_494, tsip_dialog_register_states_e.INPROGRESS, __tsip_dialog_register_InProgress_2_InProgress_X_401_407_421_494, "tsip_dialog_register_InProgress_2_InProgress_X_401_407_421_494"),
			// InProgress -> (423) -> InProgress
			tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_register_states_e.INPROGRESS, tsip_dialog_register_actions_e.I_423, tsip_dialog_register_states_e.INPROGRESS, __tsip_dialog_register_InProgress_2_InProgress_X_423, "tsip_dialog_register_InProgress_2_InProgress_X_423"),
			// InProgress -> (300_to_699) -> Terminated
			tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_register_states_e.INPROGRESS, tsip_dialog_register_actions_e.I_300_to_699, tsip_dialog_register_states_e.TERMINATED, __tsip_dialog_register_InProgress_2_Terminated_X_300_to_699, "tsip_dialog_register_InProgress_2_Terminated_X_300_to_699"),
			// InProgress -> (cancel) -> Terminated
			tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_register_states_e.INPROGRESS, tsip_dialog_register_actions_e.CANCEL, tsip_dialog_register_states_e.TERMINATED, __tsip_dialog_register_InProgress_2_Terminated_X_cancel, "tsip_dialog_register_InProgress_2_Terminated_X_cancel"),
			// InProgress -> (hangup) -> Terminated
			tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_register_states_e.INPROGRESS, tsip_dialog_register_actions_e.HANGUP, tsip_dialog_register_states_e.TERMINATED, null, "tsip_dialog_register_InProgress_2_Terminated_X_hangup"),
			// InProgress -> (shutdown) -> Terminated
			tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_register_states_e.INPROGRESS, tsip_dialog_register_actions_e.SHUTDOWN, tsip_dialog_register_states_e.TERMINATED, null, "tsip_dialog_register_InProgress_2_Terminated_X_shutdown"),

            
			/*=======================
			* === Connected === 
			*/
			// Connected -> (register) -> InProgress [refresh case]
			tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_register_states_e.CONNECTED, tsip_dialog_register_actions_e.O_REGISTER, tsip_dialog_register_states_e.INPROGRESS, __tsip_dialog_register_Connected_2_InProgress_X_oRegister, "tsip_dialog_register_Connected_2_InProgress_X_oRegister"),

            /*=======================
			* === Any === 
			*/
			// Any -> (hangup) -> InProgress
			tsk_fsm_entry.prototype.Create(tsk_fsm.prototype.__i_state_any, tsip_dialog_register_actions_e.HANGUP, __tsip_dialog_register_cond_not_silent_hangup, tsip_dialog_register_states_e.INPROGRESS, __tsip_dialog_register_Any_2_InProgress_X_hangup, "tsip_dialog_register_Any_2_InProgress_X_hangup"),
			// Any -> (silenthangup) -> Terminated
			tsk_fsm_entry.prototype.Create(tsk_fsm.prototype.__i_state_any, tsip_dialog_register_actions_e.HANGUP, __tsip_dialog_register_cond_silent_hangup, tsip_dialog_register_states_e.TERMINATED, null, "tsip_dialog_register_Any_2_InProgress_X_silenthangup"),
			// Any -> (shutdown) -> InProgress
			tsk_fsm_entry.prototype.Create(tsk_fsm.prototype.__i_state_any, tsip_dialog_register_actions_e.SHUTDOWN, __tsip_dialog_register_cond_not_silent_shutdown, tsip_dialog_register_states_e.INPROGRESS, __tsip_dialog_register_Any_2_InProgress_X_shutdown, "tsip_dialog_register_Any_2_InProgress_X_shutdown"),
			// Any -> (silentshutdown) -> Terminated
			tsk_fsm_entry.prototype.Create(tsk_fsm.prototype.__i_state_any, tsip_dialog_register_actions_e.SHUTDOWN, __tsip_dialog_register_cond_silent_shutdown, tsip_dialog_register_states_e.TERMINATED, null, "tsip_dialog_register_Any_2_InProgress_X_silentshutdown"),
			// Any -> (shutdown timedout) -> Terminated
			tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_register_actions_e.SHUTDOWN_TIMEDOUT, tsip_dialog_register_states_e.TERMINATED, null, "tsip_dialog_register_shutdown_timedout"),			
			// Any -> (transport error) -> Terminated
			tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_register_actions_e.TRANSPORT_ERROR, tsip_dialog_register_states_e.TERMINATED, __tsip_dialog_register_Any_2_Terminated_X_transportError, "tsip_dialog_register_Any_2_Terminated_X_transportError"),
			// Any -> (error) -> Terminated
			tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_register_actions_e.ERROR, tsip_dialog_register_states_e.TERMINATED, __tsip_dialog_register_Any_2_Terminated_X_Error, "tsip_dialog_register_Any_2_Terminated_X_Error")
    );
}
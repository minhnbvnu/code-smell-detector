function tsip_dialog_invite(o_session, s_call_id) {
    tsip_dialog.call(this);

    // default values
    this.o_last_oInvite = null;
    this.o_wait_oMessage = null;

    this.o_last_iOffer = null;
    this.o_last_iRefer = null;
    this.o_ss_transf = null;
    this.e_next_offer_type = tsip_dialog_invite_next_offer_type_e.NONE;

    this.i_rseq = 0;
    this.b_support_update = false;

    this.supported = {};
    this.supported.b_100rel = o_session.media.b_100rel;
    this.supported.b_norefsub = true;
    this.supported.b_refer_sub = true;
    this.supported.b_timer = (o_session.media.timers.i_timeout > 0);

    this.require = {};
    this.require.b_100rel = false;
    this.require.b_norefsub = false;
    this.require.b_timer = false;

    this.hold = {};
    this.hold.b_local = false;
    this.hold.b_remote = false;

    this.init(tsip_dialog_type_e.INVITE, s_call_id, o_session, tsip_dialog_invite_states_e.STARTED, tsip_dialog_invite_states_e.TERMINATED);
    this.set_callback(__tsip_dialog_invite_event_callback);
    this.o_fsm.set_debug_enabled(tsip_dialog_invite.prototype.__b_debug_state_machine);
    this.o_fsm.set_onterm_callback(__tsip_dialog_invite_onterm, this);

    this.o_msession_mgr = null;
    this.b_is_client = false;
    this.b_is_transf = false;

    this.o_timerShutdown = null;
    this.i_timerShutdown = (tsip_dialog.prototype.__i_timer_shutdown >> 1);

    this.stimers = {};
    this.stimers.i_timeout = o_session.media.timers.i_timeout;
    this.stimers.s_refresher = null;
    this.stimers.i_minse = 0;
    this.stimers.b_is_refresher = false;

    this.o_timer100Rel = null;
    this.i_timer100Rel = 0;
    this.o_timerSession = null;
    this.o_timerShutdown = null;
    this.i_timerShutdown = tsip_dialog.prototype.__i_timer_shutdown;
    this.o_timerLoSdpRequest = null;
    this.i_timerLoSdpRequest = tsip_dialog_invite.prototype.__i_lo_sdp_request_timeout;

    // initialize "common" state machine
    this.o_fsm.set(
        /*=======================
        * === Started === 
        */
        // Started -> (Any) -> Started
        tsk_fsm_entry.prototype.CreateAlwaysNothing(tsip_dialog_invite_states_e.STARTED, "tsip_dialog_invite_Started_2_Started_X_any"),

        /*=======================
        * === Connected === 
        */
        // Connected -> (Send DTMF) -> Connected
        tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_invite_states_e.CONNECTED, tsip_dialog_invite_actions_e.DTMF_SEND, tsip_dialog_invite_states_e.CONNECTED, x0000_Connected_2_Connected_X_oDTMF, "x0000_Connected_2_Connected_X_oDTMF"),
        // Connected -> (Send MSRP message) -> Connected
        tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_invite_states_e.CONNECTED, tsip_dialog_invite_actions_e.MSRP_SEND_MSG, tsip_dialog_invite_states_e.CONNECTED, x0000_Connected_2_Connected_X_oLMessage, "x0000_Connected_2_Connected_X_oLMessage"),
        // Connected -> (iACK) -> Connected
        tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_invite_states_e.CONNECTED, tsip_dialog_invite_actions_e.I_ACK, tsip_dialog_invite_states_e.CONNECTED, x0000_Connected_2_Connected_X_iACK, "x0000_Connected_2_Connected_X_iACK"),
        // Connected -> (iINVITE) -> Connected
        tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_invite_states_e.CONNECTED, tsip_dialog_invite_actions_e.I_INVITE, tsip_dialog_invite_states_e.CONNECTED, x0000_Connected_2_Connected_X_iINVITEorUPDATE, "x0000_Connected_2_Connected_X_iINVITE"),
        // Connected -> (iUPDATE) -> Connected
        tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_invite_states_e.CONNECTED, tsip_dialog_invite_actions_e.I_UPDATE, tsip_dialog_invite_states_e.CONNECTED, x0000_Connected_2_Connected_X_iINVITEorUPDATE, "x0000_Connected_2_Connected_X_iUPDATE"),
        // Connected -> (send reINVITE) -> Connected
        tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_invite_states_e.CONNECTED, tsip_dialog_invite_actions_e.O_INVITE, tsip_dialog_invite_states_e.CONNECTED, x0000_Connected_2_Connected_X_oINVITE, "x0000_Connected_2_Connected_X_oINVITE"),

        /*=======================
        * === BYE/SHUTDOWN === 
        */
        // Any -> (oBYE) -> Trying
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.O_BYE, tsip_dialog_invite_states_e.TRYING, x0000_Any_2_Trying_X_oBYE, "x0000_Any_2_Trying_X_oBYE"),
        // Any -> (iBYE) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.I_BYE, tsip_dialog_invite_states_e.TERMINATED, x0000_Any_2_Terminated_X_iBYE, "x0000_Any_2_Terminated_X_iBYE"),
        // Any -> (i3xx-i6xx BYE) -> Terminated
        tsk_fsm_entry.prototype.Create(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.I_300_to_699, __tsip_dialog_invite_cond_is_resp2bye, tsip_dialog_invite_states_e.TERMINATED, null, "x0000_Any_2_Terminated_X_i3xxTOi6xxBYE"),
        // Any -> (i2xxx BYE) -> Terminated
        tsk_fsm_entry.prototype.Create(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.I_2XX, __tsip_dialog_invite_cond_is_resp2bye, tsip_dialog_invite_states_e.TERMINATED, null, "x0000_Any_2_Terminated_X_i2xxBYE"),
        // Any -> (Shutdown) -> Trying
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.O_SHUTDOWN, tsip_dialog_invite_states_e.TRYING, x0000_Any_2_Trying_X_shutdown, "x0000_Any_2_Trying_X_shutdown"),
        // Any -> (shutdown timedout) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.SHUTDOWN_TIMEDOUT, tsip_dialog_invite_states_e.TERMINATED, null, "tsip_dialog_invite_shutdown_timedout"),


        /*=======================
        * === Any === 
        */
         // Any -> (NoOps) -> Any
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.MUTE, tsk_fsm.prototype.__i_state_any, x0000_Any_2_Any_X_noOps, "x0000_Any_2_Any_X_noOps"),
        // Any -> (i1xx) -> Any
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.I_1XX, tsk_fsm.prototype.__i_state_any, x0000_Any_2_Any_X_i1xx, "x0000_Any_2_Any_X_i1xx"),
        // Any -> (oINFO) -> Any
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.O_INFO, tsk_fsm.prototype.__i_state_any, x0000_Any_2_Any_X_oINFO, "x0000_Any_2_Any_X_oINFO"),
        // Any -> (iINFO) -> Any
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.I_INFO, tsk_fsm.prototype.__i_state_any, x0000_Any_2_Any_X_iINFO, "x0000_Any_2_Any_X_iINFO"),
        // Any -> (i401/407)
        //
        // Any -> (iPRACK) -> Any
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.I_PRACK, tsk_fsm.prototype.__i_state_any, x0000_Any_2_Any_X_iPRACK, "x0000_Any_2_Any_X_iPRACK"),
        // Any -> (iOPTIONS) -> Any
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.I_OPTIONS, tsk_fsm.prototype.__i_state_any, x0000_Any_2_Any_X_iOPTIONS, "x0000_Any_2_Any_X_iOPTIONS"),
        // Any -> (i2xx INVITE) -> Any
        tsk_fsm_entry.prototype.Create(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.I_2XX, __tsip_dialog_invite_cond_is_resp2invite, tsk_fsm.prototype.__i_state_any, x0000_Any_2_Any_X_i2xxINVITEorUPDATE, "x0000_Any_2_Any_X_i2xxINVITE"),
        // Any -> (i2xx UPDATE) -> Any
        tsk_fsm_entry.prototype.Create(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.I_2XX, __tsip_dialog_invite_cond_is_resp2update, tsk_fsm.prototype.__i_state_any, x0000_Any_2_Any_X_i2xxINVITEorUPDATE, "x0000_Any_2_Any_X_i2xxUPDATE"),
        // Any -> (i401/407 INVITE) -> Any
        tsk_fsm_entry.prototype.Create(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.I_401_407, __tsip_dialog_invite_cond_is_resp2invite, tsk_fsm.prototype.__i_state_any, x0000_Any_2_Any_X_i401_407_INVITEorUPDATE, "x0000_Any_2_Any_X_i401_407_INVITE"),
        // Any -> (i401/407  UPDATE) -> Any
        tsk_fsm_entry.prototype.Create(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.I_401_407, __tsip_dialog_invite_cond_is_resp2update, tsk_fsm.prototype.__i_state_any, x0000_Any_2_Any_X_i401_407_INVITEorUPDATE, "x0000_Any_2_Any_X_i401_407_UPDATE"),
        // Any -> (i2xx PRACK) -> Any
        tsk_fsm_entry.prototype.Create(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.I_2XX, __tsip_dialog_invite_cond_is_resp2prack, tsk_fsm.prototype.__i_state_any, null, "x0000_Any_2_Any_X_i2xxPRACK"),
        // Any -> (i2xx INFO) -> Any
        tsk_fsm_entry.prototype.Create(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.I_2XX, __tsip_dialog_invite_cond_is_resp2info, tsk_fsm.prototype.__i_state_any, null, "x0000_Any_2_Any_X_i2xxINFO"),
        // Any -> (local sdp request timeout) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.TIMER_LO_SDP_REQUEST, tsip_dialog_invite_states_e.TERMINATED, x9997_Any_2_Any_X_LoSdpRequestTimeout, "x9997_Any_2_Any_X_LoSdpRequestTimeout"),
        // Any -> (transport error) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.TRANSPORT_ERROR, tsip_dialog_invite_states_e.TERMINATED, x9998_Any_2_Terminated_X_transportError, "x9998_Any_2_Terminated_X_transportError"),
        // Any -> (error) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.ERROR, tsip_dialog_invite_states_e.TERMINATED, x9999_Any_2_Terminated_X_Error, "x9999_Any_2_Terminated_X_Error")
    );

    // initialize "client" state machine
    this.init_client();
    // initialize "server" state machine
    this.init_server();
    /* 3GPP TS 24.610: Communication Hold  */
    this.init_hold();
    /* 3GPP TS 24.629: Explicit Communication Transfer (ECT) using IP Multimedia (IM) Core Network (CN) subsystem */
    this.init_ect();
}
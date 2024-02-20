function x0400_Connected_2_oECTing_X_oECT(ao_args){
	var i_ret;
	var o_dialog = ao_args[0];
    var o_action = ao_args[2];

	i_ret = o_dialog.ect_send_refer(o_action.ect.s_to);
	if(i_ret == 0){
        o_dialog.signal_invite(tsip_event_invite_type_e.O_ECT_TRYING, tsip_event_code_e.DIALOG_REQUEST_SENT, "Call Transfer Initiated", null);
	}
	//else; //Must never happen

	return i_ret;
}
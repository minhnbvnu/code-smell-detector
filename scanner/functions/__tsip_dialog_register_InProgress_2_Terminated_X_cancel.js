function __tsip_dialog_register_InProgress_2_Terminated_X_cancel(ao_args) {
    var o_dialog = ao_args[0];
	var o_action = ao_args[3];
    var i_ret;

    // set  current action
	o_dialog.set_action_curr(o_action);

	// Cancel all transactions associated to this dialog (will also be done when the dialog is destroyed (worth nothing))
	i_ret = o_dialog.get_layer_transac().cancel_by_dialog(o_dialog);

	/* RFC 3261 - 9.1 Client Behavior
	   A CANCEL request SHOULD NOT be sent to cancel a request other than INVITE.
	*/

	// alert the user
    o_dialog.signal(tsip_event_code_e.DIALOG_CANCELLED, "Registration cancelled");

	return i_ret;
}
function x0000_Any_2_Any_X_oINFO(ao_args) {
    var o_dialog = ao_args[0];
    var o_action = ao_args[2];
    var o_request;

    o_dialog.b_running = true;
    o_dialog.set_action_curr(o_action);

    if ((o_request = o_dialog.request_new("INFO"))) {
        var i_ret;
        if ((i_ret = tsip_dialog.prototype.ApplyAction(o_request, o_action)) == 0) {
            i_ret = o_dialog.request_send(o_request);
        }
        return i_ret;
	}
	else{
		tsk_utils_log_error("Failed to create new INFO request");
		return -1;
	}
}
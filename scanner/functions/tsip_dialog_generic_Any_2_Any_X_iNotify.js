function tsip_dialog_generic_Any_2_Any_X_iNotify(ao_args) {
     var o_dialog = ao_args[0];
     var o_request = ao_args[1];

     /* Send 2xx NOTIFY */
     var o_response;
     var i_ret = -1;
     if ((o_response = o_dialog.response_new(200, 'OK', o_request))) {
        i_ret = o_dialog.response_send(o_response);
     }

     // update timeout using expires from subscription state (e.g. 'Subscription-State: pending;expires=200')
     o_dialog.i_timerRefresh = o_dialog.get_newdelay(o_request);
	 o_dialog.timer_schedule('generic', 'Refresh');

     // alert user
     o_dialog.signal_i(tsip_event_code_e.DIALOG_REQUEST_INCOMING, 'Incoming NOTIFY', o_request);

     return i_ret;
}
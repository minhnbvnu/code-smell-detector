function __tsip_transac_nict_Proceeding_2_Proceeding_X_1xx(ao_args) {
    var o_transac = ao_args[0];
    var o_message1xx = ao_args[1];

	if(!o_transac.b_reliable){
		o_transac.timer_cancel('E');
	}
    o_transac.get_dialog().callback(tsip_dialog_event_type_e.I_MSG, o_message1xx);

	return 0;
}
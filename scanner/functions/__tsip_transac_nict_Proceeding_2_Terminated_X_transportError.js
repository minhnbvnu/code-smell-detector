function __tsip_transac_nict_Proceeding_2_Terminated_X_transportError(ao_args) {
    var o_transac = ao_args[0];

	/* Timers will be canceles by On */
    o_transac.get_dialog().callback(tsip_dialog_event_type_e.TRANSPORT_ERROR, null);

	return 0;
}
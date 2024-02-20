function __tsip_transac_ict_Any_2_Terminated_X_transportError(ao_args) {
    var o_transac = ao_args[0];

	/* Timers will be canceled by "tsip_transac_ict_OnTerminated" */

    return o_transac.get_dialog().callback(tsip_dialog_event_type_e.TRANSPORT_ERROR, null);
}
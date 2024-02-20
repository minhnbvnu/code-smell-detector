function __tsip_transac_ist_Accepted_2_Accepted_iACK(ao_args) {
    var o_transac = ao_args[0];
    var o_request = ao_args[1];
    o_transac.timer_cancel('X');
    return o_transac.get_dialog().callback(tsip_dialog_event_type_e.I_MSG, o_request);
}
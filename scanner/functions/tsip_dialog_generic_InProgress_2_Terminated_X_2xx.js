function tsip_dialog_generic_InProgress_2_Terminated_X_2xx(ao_args) {
    var o_dialog = ao_args[0];
    var o_response = ao_args[1];

    return o_dialog.signal_ao(o_response.get_response_code(), o_response.get_response_phrase(), o_response);
}
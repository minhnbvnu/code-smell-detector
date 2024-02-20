function __tsip_dialog_register_InProgress_2_InProgress_X_1xx(ao_args) {
    var o_dialog = ao_args[0];
    var o_message1xx = ao_args[1];

    // alert user
    o_dialog.signal_register(tsip_event_register_type_e.AO_REGISTER, o_message1xx.get_response_code(), o_message1xx.get_response_phrase(), o_message1xx);

    return o_dialog.update_with_response(o_message1xx);
}
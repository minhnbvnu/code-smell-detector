function x0400_iECTing_2_iECTing_X_1xxfNOTIFY(ao_args){
    var o_dialog = ao_args[0];
    var o_response = ao_args[1];

    return o_dialog.ect_send_notify(o_response.get_response_code(), o_response.get_response_phrase());
}
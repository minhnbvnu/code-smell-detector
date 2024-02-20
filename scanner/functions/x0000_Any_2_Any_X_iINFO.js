function x0000_Any_2_Any_X_iINFO(ao_args) {
    var o_dialog = ao_args[0];
    var o_request = ao_args[1];

    var i_ret = o_dialog.send_response(o_request, 200, "OK");
    /*i_ret =*/ o_dialog.signal_invite(tsip_event_invite_type_e.DIALOG_REQUEST_INCOMING, tsip_event_code_e.DIALOG_REQUEST_INCOMING, "Incoming Request", o_request);

    // Forward the content to the media stack (e.g. rfc5168("picture_fast_update") to request IDR)
    if (o_dialog.o_msession_mgr && o_request.has_content()) {
        var s_content_as_string = o_request.get_content_as_string();
        if (!tsk_string_is_null_or_empty(s_content_as_string)) {
            o_dialog.o_msession_mgr.processContent("INFO", o_request.get_content_type(), s_content_as_string, s_content_as_string.length);
        }
    }

    return i_ret;
}
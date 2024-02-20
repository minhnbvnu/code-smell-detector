function x0400_iECTreq_2_Connected_X_reject(ao_args){
    var o_dialog = ao_args[0];
    var o_action = ao_args[2];


    /* Send Reject */
    var i_code = o_action.line_resp.i_code >= 300 ? o_action.line_resp.i_code : 603;
    var s_phrase = o_action.line_resp.s_phrase ? o_action.line_resp.s_phrase : "Decline";
    var s_reason = tsk_string_format("SIP; cause={0}; text=\"{1}\"", i_code, s_phrase);
    return o_dialog.send_error(o_dialog.o_last_iRefer, i_code, s_phrase, s_reason);
}
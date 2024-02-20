function x0000_Any_2_Any_X_noOps(ao_args) {
    var o_dialog = ao_args[0];
    var o_action = ao_args[2];
    switch(o_action.e_type) {
        case tsip_action_type_e.MUTE:
            {
                if (o_dialog.o_msession_mgr) {
                    o_dialog.o_msession_mgr.set(tmedia_session_mgr.prototype.SetParamSession(o_dialog.o_msession_mgr.e_type, "mute-" + o_action.mute.s_media, o_action.mute.b_muted));
                }
                break;
            }
        default:
            {
                tsk_utils_log_error("Not implemented");
                return -1;
            }
    }
    return 0;
}
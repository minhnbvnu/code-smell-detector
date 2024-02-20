function x0000_Connected_2_Connected_X_oDTMF(ao_args) {
    if (ao_args[0].o_msession_mgr && (WebRtc4all_GetType() == WebRtcType_e.W4A || WebRtc4all_GetType() == WebRtcType_e.IE || WebRtc4all_GetType() == WebRtcType_e.NPAPI)) {
        var o_action = ao_args[2];
        return ao_args[0].o_msession_mgr.send_dtmf(o_action.o_content.toString());
    }
    else {
        return x0000_Any_2_Any_X_oINFO(ao_args);
    }
}
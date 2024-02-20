function WebRtc4all_SetType(s_type) {
    if (__webrtc_type != WebRtcType_e.NONE) {
        tsk_utils_log_error("Trying not set default webrtc type after init() is not allowed");
        return false;
    }
    switch (s_type) {
        case "w4a":
            __webrtc_type = WebRtcType_e.W4A;
            break;
        case "ericsson":
            __webrtc_type = WebRtcType_e.ERICSSON;
            break;
        case "native":
            __webrtc_type = WebRtcType_e.NATIVE;
            break;
        default:
            tsk_utils_log_error("[" + s_type + "] not valid as default webrtc type");
            return false;
    }
    return true;
}
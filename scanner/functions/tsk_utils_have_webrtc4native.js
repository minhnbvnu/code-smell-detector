function tsk_utils_have_webrtc4native() {
    return (WebRtc4all_GetType() == WebRtcType_e.NATIVE);
}
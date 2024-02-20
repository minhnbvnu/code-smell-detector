function tsk_utils_have_webrtc() {
    return (WebRtc4all_GetType() != WebRtcType_e.NONE);
}
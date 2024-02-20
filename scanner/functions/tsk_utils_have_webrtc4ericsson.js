function tsk_utils_have_webrtc4ericsson() {
    return (WebRtc4all_GetType() == WebRtcType_e.ERICSSON);
}
function tsk_utils_have_webrtc4ie() {
    return (WebRtc4all_GetType() == WebRtcType_e.IE);
}
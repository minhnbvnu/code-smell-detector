function tsk_utils_have_webrtc4npapi() {
    return (WebRtc4all_GetType() == WebRtcType_e.NPAPI);
}
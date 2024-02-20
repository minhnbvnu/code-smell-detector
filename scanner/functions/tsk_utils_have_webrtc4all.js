function tsk_utils_have_webrtc4all() {
    return (tsk_utils_have_webrtc4npapi() || tsk_utils_have_webrtc4ie());
}
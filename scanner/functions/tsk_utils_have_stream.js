function tsk_utils_have_stream() {
    try {
        return (tsk_utils_have_webrtc4all() || !!navigator.getUserMedia);
    }
    catch (e) { }
    return false;
}
function WebRtc4all_GetLooper() {
    if (__looper == undefined && tsk_utils_have_webrtc4ie()) {
        try {
            __looper = WebRtc4all_GetPlugin().windowHandle;
          if (!__looper) {
            tsk_utils_log_error("Failed to create looper. Your app may crash on IE11");
          }
        }
        catch (e) {
            tsk_utils_log_error(e);
            __looper = null;
        }
    }
    return __looper;
}
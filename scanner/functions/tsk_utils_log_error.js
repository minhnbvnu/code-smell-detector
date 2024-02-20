function tsk_utils_log_error(s_msg) {
    if (__i_debug_level >= 2) {
        window.console && window.console.error && window.console.error(s_msg);
    }
}
function tsk_utils_log_warn(s_msg) {
    if (__i_debug_level >= 3) {
        window.console && window.console.warn && window.console.warn(s_msg);
    }
}
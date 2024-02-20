function tsk_utils_log_info(s_msg) {
    if (__i_debug_level >= 4) {
        window.console && window.console.info && window.console.info(s_msg);
    }
}
function tsk_utils_log_fatal(s_msg) {
    if(__i_debug_level >= 1) {
        tsk_utils_log_error(s_msg);
    }
}
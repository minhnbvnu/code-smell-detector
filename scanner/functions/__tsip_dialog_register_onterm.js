function __tsip_dialog_register_onterm(o_self) {
    tsk_utils_log_info("=== REGISTER Dialog terminated ===");

    o_self.timer_cancel('Refresh');
    o_self.timer_cancel('Shutdown');

    o_self.signal(tsip_event_code_e.DIALOG_TERMINATED,
            o_self.last_error.s_phrase ? o_self.last_error.s_phrase : "Disconnected",
            o_self.last_error.o_message);

    // deinit
    return o_self.deinit();
}
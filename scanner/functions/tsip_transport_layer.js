function tsip_transport_layer(o_stack) {
    if (!o_stack) {
        tsk_utils_log_error("Invalid argument");
        return null;
    }

    this.o_stack = o_stack;
    this.b_running = false;
    this.ao_transports = new Array();
}
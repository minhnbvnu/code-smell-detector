function tsip_transac_layer(o_stack) {
    if (!o_stack) {
        tsk_utils_log_error("Invalid argument");
        return null;
    }

    this.o_stack = o_stack;
    this.ao_transacs = new Array();
}
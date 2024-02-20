function tsip_dialog_layer(o_stack) {
    if (!o_stack) {
        tsk_utils_log_error("Invalid argument");
        return null;
    }
    
    this.o_stack = o_stack;
    this.ao_dialogs = new Array();

    this.shutdown = {};
    this.shutdown.b_inprogress = false;
    this.shutdown.b_phase2 = false;

    this.b_locked = false;
}
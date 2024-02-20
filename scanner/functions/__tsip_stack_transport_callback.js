function __tsip_stack_transport_callback(evt) {
    var o_stack = evt.o_transport.o_stack;

    switch (evt.e_type) {
        case tsip_transport_event_type_e.STARTED:
            {
                o_stack.e_state = tsip_transport_state_e.STARTED;
                o_stack.signal(tsip_event_code_e.STACK_STARTED, "Stack started");
                break;
            }

        case tsip_transport_event_type_e.STOPPED:
            {
                if (o_stack.e_state == tsip_transport_state_e.STARTING) {
                    o_stack.signal(tsip_event_code_e.STACK_FAILED_TO_START, "Failed to connet to the server");
                }
                else {
                    o_stack.signal(tsip_event_code_e.STACK_STOPPED, "Stack stopped");
                }
                o_stack.e_state = tsip_transport_state_e.STOPPED;
                o_stack.o_layer_transport.transport_remove(evt.o_transport);
                break;
            }

        case tsip_transport_event_type_e.ERROR:
            {
                break;
            }
    }
        
    return 0;
}
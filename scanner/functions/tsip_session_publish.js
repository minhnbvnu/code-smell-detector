function tsip_session_publish(o_stack) {
    tsip_session.call(this, o_stack);
    this.__set(Array.prototype.slice.call(arguments, 1));
}
function tsip_transport_event(o_transport, e_type, s_description, o_data) {
    this.o_transport = o_transport;
    this.e_type = e_type;
    this.s_description = s_description;
    this.o_data = o_data;
    return this;
}
function tsip_header_Via(s_proto_name, s_proto_version, s_transport, s_host, i_port){
	tsip_header.call(this, tsip_header_type_e.Via);
    this.s_branch = null;
	this.s_host = s_host;
	this.i_port = i_port;
	this.s_comp = null;
	this.s_sigcomp_id = null;
	this.s_received = null;
	this.s_maddr = null;
	this.s_proto_name = s_proto_name;
	this.s_proto_version = s_proto_version;
	this.s_transport = s_transport;
	this.i_rport = -1;
	this.i_ttl = -1;
	this.is_transport_reliable = function(){
		return tsk_string_iequals(this.s_transport, "UDP");
	};
	this.is_transport_unreliable = function(){
		return !this.is_transport_reliable();
	};
}
function tsdp_header_V(i_version){
	tsdp_header.call(this, tsdp_header_type_e.V);
	this.i_version = i_version;
	this.toString = function(){
		return this.i_version.toString();
	}
}
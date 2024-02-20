function tsip_header_RAck(i_seq, i_cseq, s_method){
	tsip_header.call(this, tsip_header_type_e.RAck);
    this.i_seq = i_seq;
    this.i_cseq = i_cseq;
    this.s_method = s_method;
}
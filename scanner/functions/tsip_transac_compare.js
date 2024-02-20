function tsip_transac_compare(o_transac1, o_transac2){
	if(o_transac1 && o_transac2){
		if((o_transac1.s_branch == o_transac2.s_branch) && (o_transac1.s_cseq_method == o_transac2.s_cseq_method)){
			return 0;
		}
	}
	return -1;
}
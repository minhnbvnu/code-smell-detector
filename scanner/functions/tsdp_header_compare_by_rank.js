function tsdp_header_compare_by_rank(o_hdr_1, o_hdr_2) {
    if (o_hdr_1 && o_hdr_2) {
        return o_hdr_1.e_type.i_rank - o_hdr_2.e_type.i_rank;
    }
    return -1;
}
function bit_scan(x){
    var res = 0;
    res |= (x & bit_mask1 ) ? 1 : 0;
    res |= (x & bit_mask2 ) ? 2 : 0;
    res |= (x & bit_mask3 ) ? 4 : 0;
    res |= (x & bit_mask4 ) ? 8 : 0;
    res |= (x & bit_mask5 ) ? 16 : 0;
    return res;
}
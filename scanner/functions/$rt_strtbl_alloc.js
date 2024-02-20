function $rt_strtbl_alloc(cap)
{    
    var o = $ir_alloc_refptr($rt_strtbl_comp_size(cap));
    $rt_strtbl_set_cap(o, cap);
    $rt_strtbl_set_header(o, 1);
    return o;
}
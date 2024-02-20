function $rt_arrtbl_alloc(cap)
{    
    var o = $ir_alloc_refptr($rt_arrtbl_comp_size(cap));
    $rt_arrtbl_set_cap(o, cap);
    $rt_arrtbl_set_header(o, 7);
    return o;
}
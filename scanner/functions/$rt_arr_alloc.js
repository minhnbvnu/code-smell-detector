function $rt_arr_alloc(cap)
{    
    var o = $ir_alloc_array($rt_arr_comp_size(cap));
    $rt_arr_set_cap(o, cap);
    $rt_arr_set_header(o, 6);
    return o;
}
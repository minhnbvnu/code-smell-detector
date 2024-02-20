function $rt_obj_alloc(cap)
{    
    var o = $ir_alloc_object($rt_obj_comp_size(cap));
    $rt_obj_set_cap(o, cap);
    $rt_obj_set_header(o, 3);
    return o;
}
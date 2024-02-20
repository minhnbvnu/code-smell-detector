function $rt_rope_alloc()
{    
    var o = $ir_alloc_rope($rt_rope_comp_size());
    $rt_rope_set_header(o, 2);
    return o;
}
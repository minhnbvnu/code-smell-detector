function $rt_str_alloc(len)
{    
    var o = $ir_alloc_string($rt_str_comp_size(len));
    $rt_str_set_len(o, len);
    return o;
}
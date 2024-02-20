function $rt_obj_set_tag(o, i, v)
{    
    $ir_store_u8(o, $rt_obj_ofs_tag(o, i), v);
}
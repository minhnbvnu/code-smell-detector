function $rt_obj_get_tag(o, i)
{    
    return $ir_load_u8(o, $rt_obj_ofs_tag(o, i));
}
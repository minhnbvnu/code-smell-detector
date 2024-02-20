function $rt_obj_get_header(o)
{    
    return $ir_load_u32(o, $rt_obj_ofs_header(o));
}
function $rt_str_get_header(o)
{    
    return $ir_load_u32(o, $rt_str_ofs_header(o));
}
function $rt_str_get_len(o)
{    
    return $ir_load_u32(o, $rt_str_ofs_len(o));
}
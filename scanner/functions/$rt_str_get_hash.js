function $rt_str_get_hash(o)
{    
    return $ir_load_u32(o, $rt_str_ofs_hash(o));
}
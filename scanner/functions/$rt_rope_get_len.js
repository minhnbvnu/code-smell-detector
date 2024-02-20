function $rt_rope_get_len(o)
{    
    return $ir_load_u32(o, $rt_rope_ofs_len(o));
}
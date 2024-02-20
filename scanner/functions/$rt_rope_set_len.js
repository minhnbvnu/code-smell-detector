function $rt_rope_set_len(o, v)
{    
    $ir_store_u32(o, $rt_rope_ofs_len(o), v);
}
function $rt_rope_set_header(o, v)
{    
    $ir_store_u32(o, $rt_rope_ofs_header(o), v);
}
function $rt_str_set_len(o, v)
{    
    $ir_store_u32(o, $rt_str_ofs_len(o), v);
}
function $rt_str_set_hash(o, v)
{    
    $ir_store_u32(o, $rt_str_ofs_hash(o), v);
}
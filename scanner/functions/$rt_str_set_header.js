function $rt_str_set_header(o, v)
{    
    $ir_store_u32(o, $rt_str_ofs_header(o), v);
}
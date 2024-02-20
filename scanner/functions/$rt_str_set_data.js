function $rt_str_set_data(o, i, v)
{    
    $ir_store_u16(o, $rt_str_ofs_data(o, i), v);
}
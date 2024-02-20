function $rt_str_get_data(o, i)
{    
    return $ir_load_u16(o, $rt_str_ofs_data(o, i));
}
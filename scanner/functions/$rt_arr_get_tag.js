function $rt_arr_get_tag(o, i)
{    
    return $ir_load_u8(o, $rt_arr_ofs_tag(o, i));
}
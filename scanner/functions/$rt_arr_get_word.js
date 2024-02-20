function $rt_arr_get_word(o, i)
{    
    return $ir_load_u64(o, $rt_arr_ofs_word(o, i));
}
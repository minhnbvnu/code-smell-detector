function $rt_obj_get_word(o, i)
{    
    return $ir_load_u64(o, $rt_obj_ofs_word(o, i));
}
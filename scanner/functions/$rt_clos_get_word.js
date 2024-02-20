function $rt_clos_get_word(o, i)
{    
    return $ir_load_u64(o, $rt_clos_ofs_word(o, i));
}
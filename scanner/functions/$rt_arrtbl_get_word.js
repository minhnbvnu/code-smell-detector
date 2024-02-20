function $rt_arrtbl_get_word(o, i)
{    
    return $ir_load_u64(o, $rt_arrtbl_ofs_word(o, i));
}
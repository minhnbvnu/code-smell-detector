function $rt_arrtbl_set_word(o, i, v)
{    
    $ir_store_u64(o, $rt_arrtbl_ofs_word(o, i), v);
}
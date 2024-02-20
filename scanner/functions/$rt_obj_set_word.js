function $rt_obj_set_word(o, i, v)
{    
    $ir_store_u64(o, $rt_obj_ofs_word(o, i), v);
}
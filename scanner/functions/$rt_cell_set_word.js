function $rt_cell_set_word(o, v)
{    
    $ir_store_u64(o, $rt_cell_ofs_word(o), v);
}
function $rt_cell_get_word(o)
{    
    return $ir_load_u64(o, $rt_cell_ofs_word(o));
}
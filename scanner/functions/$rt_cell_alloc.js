function $rt_cell_alloc()
{    
    var o = $ir_alloc_refptr($rt_cell_comp_size());
    $rt_cell_set_header(o, 5);
    $rt_cell_set_word(o, $ir_get_word($undef));
    return o;
}
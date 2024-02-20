function $rt_cell_set_header(o, v)
{    
    $ir_store_u32(o, $rt_cell_ofs_header(o), v);
}
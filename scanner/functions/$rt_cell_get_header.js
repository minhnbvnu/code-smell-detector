function $rt_cell_get_header(o)
{    
    return $ir_load_u32(o, $rt_cell_ofs_header(o));
}
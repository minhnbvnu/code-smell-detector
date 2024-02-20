function $rt_cell_get_next(o)
{    
    return $ir_load_refptr(o, $rt_cell_ofs_next(o));
}
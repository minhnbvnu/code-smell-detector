function $rt_clos_get_cell(o, i)
{    
    return $ir_load_refptr(o, $rt_clos_ofs_cell(o, i));
}
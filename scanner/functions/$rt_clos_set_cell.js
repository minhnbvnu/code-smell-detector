function $rt_clos_set_cell(o, i, v)
{    
    $ir_store_refptr(o, $rt_clos_ofs_cell(o, i), v);
}
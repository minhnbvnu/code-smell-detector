function $rt_clos_get_next(o)
{    
    return $ir_load_refptr(o, $rt_clos_ofs_next(o));
}
function $rt_arrtbl_get_next(o)
{    
    return $ir_load_refptr(o, $rt_arrtbl_ofs_next(o));
}
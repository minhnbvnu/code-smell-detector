function $rt_strtbl_get_next(o)
{    
    return $ir_load_refptr(o, $rt_strtbl_ofs_next(o));
}
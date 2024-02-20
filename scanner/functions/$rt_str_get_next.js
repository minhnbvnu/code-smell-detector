function $rt_str_get_next(o)
{    
    return $ir_load_refptr(o, $rt_str_ofs_next(o));
}
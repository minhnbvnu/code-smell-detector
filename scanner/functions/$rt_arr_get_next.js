function $rt_arr_get_next(o)
{    
    return $ir_load_refptr(o, $rt_arr_ofs_next(o));
}
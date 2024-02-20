function $rt_obj_get_next(o)
{    
    return $ir_load_refptr(o, $rt_obj_ofs_next(o));
}
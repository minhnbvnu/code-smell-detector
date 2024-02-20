function $rt_rope_get_next(o)
{    
    return $ir_load_refptr(o, $rt_rope_ofs_next(o));
}
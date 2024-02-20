function $rt_obj_set_next(o, v)
{    
    $ir_store_refptr(o, $rt_obj_ofs_next(o), v);
}
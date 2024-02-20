function $rt_obj_set_header(o, v)
{    
    $ir_store_u32(o, $rt_obj_ofs_header(o), v);
}
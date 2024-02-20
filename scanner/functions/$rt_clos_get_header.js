function $rt_clos_get_header(o)
{    
    return $ir_load_u32(o, $rt_clos_ofs_header(o));
}
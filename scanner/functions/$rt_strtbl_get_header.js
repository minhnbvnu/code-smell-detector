function $rt_strtbl_get_header(o)
{    
    return $ir_load_u32(o, $rt_strtbl_ofs_header(o));
}
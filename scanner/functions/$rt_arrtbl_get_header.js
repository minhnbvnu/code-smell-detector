function $rt_arrtbl_get_header(o)
{    
    return $ir_load_u32(o, $rt_arrtbl_ofs_header(o));
}
function $rt_arrtbl_get_tag(o, i)
{    
    return $ir_load_u8(o, $rt_arrtbl_ofs_tag(o, i));
}
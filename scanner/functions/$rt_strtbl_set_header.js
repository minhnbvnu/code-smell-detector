function $rt_strtbl_set_header(o, v)
{    
    $ir_store_u32(o, $rt_strtbl_ofs_header(o), v);
}
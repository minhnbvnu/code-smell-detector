function $rt_strtbl_get_num_strs(o)
{    
    return $ir_load_u32(o, $rt_strtbl_ofs_num_strs(o));
}
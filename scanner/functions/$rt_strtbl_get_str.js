function $rt_strtbl_get_str(o, i)
{    
    return $ir_load_refptr(o, $rt_strtbl_ofs_str(o, i));
}
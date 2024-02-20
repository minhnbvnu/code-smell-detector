function $rt_strtbl_set_str(o, i, v)
{    
    $ir_store_refptr(o, $rt_strtbl_ofs_str(o, i), v);
}
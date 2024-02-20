function $rt_clos_ofs_tag(o, i)
{    
    return $ir_add_i32($ir_add_i32($ir_add_i32($ir_add_i32($ir_add_i32($ir_add_i32($ir_add_i32(0, 8), 4), 4), 4), 4), $ir_mul_i32(8, $rt_clos_get_cap(o))), $ir_mul_i32(1, i));
}
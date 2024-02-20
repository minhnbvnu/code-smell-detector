function $rt_str_ofs_data(o, i)
{    
    return $ir_add_i32($ir_add_i32($ir_add_i32($ir_add_i32($ir_add_i32(0, 8), 4), 4), 4), $ir_mul_i32(2, i));
}
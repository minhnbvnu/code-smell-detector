function $rt_arr_comp_size(cap)
{    
    return $ir_add_i32($ir_add_i32($ir_add_i32($ir_add_i32($ir_add_i32($ir_add_i32($ir_add_i32(0, 8), 4), 4), 4), 4), $ir_mul_i32(8, cap)), $ir_mul_i32(1, cap));
}
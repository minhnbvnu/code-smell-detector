function $rt_clos_comp_size(cap, num_cells)
{    
    return $ir_add_i32($ir_add_i32($ir_and_i32($ir_add_i32($ir_add_i32($ir_add_i32($ir_add_i32($ir_add_i32($ir_add_i32($ir_add_i32($ir_add_i32(0, 8), 4), 4), 4), 4), $ir_mul_i32(8, cap)), $ir_mul_i32(1, cap)), 7), -8), 4), $ir_mul_i32(8, num_cells));
}
function $rt_rsft(x, y)
{
    // If x is integer
    if ($ir_is_int32(x))
    {
        // If y is integer
        if ($ir_is_int32(y))
            return $ir_rsft_i32(x, y);
    }

    // If x is floating-point
    if ($ir_is_float64(x) &&
        $ir_ge_f64(x, 0.0) &&
        $ir_le_f64(x, 512000000.0))
    {
        // If y is integer
        if ($ir_is_int32(y))
        {
            return $ir_rsft_i32($ir_f64_to_i32(x), y);
        }
    }

    // Convert the operands to integers
    return $ir_rsft_i32($rt_toInt32(x), $rt_toUint32(y));
}
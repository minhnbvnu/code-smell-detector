function $rt_ursft(x, y)
{
    // If both values are integer
    if ($ir_is_int32(x) && $ir_is_int32(y))
    {
        return $ir_ursft_i32(x, y);
    }

    // Convert the operands to integers
    return $ir_ursft_i32($rt_toInt32(x), $rt_toUint32(y));
}
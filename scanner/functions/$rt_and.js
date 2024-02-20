function $rt_and(x, y)
{
    // If both values are integer
    if ($ir_is_int32(x) && $ir_is_int32(y))
    {
        return $ir_and_i32(x, y);
    }

    // Convert the operands to integers
    return $ir_and_i32($rt_toInt32(x), $rt_toInt32(y));
}
function $rt_or(x, y)
{
    // If x is integer
    if ($ir_is_int32(x))
    {
        // If y is integer
        if ($ir_is_int32(y))
            return $ir_or_i32(x, y);
    }

    // If x is undefined
    if ($ir_is_undef(x))
    {
        if ($ir_is_int32(y))
            return y;
    }

    // Convert the operands to integers
    return $ir_or_i32($rt_toInt32(x), $rt_toInt32(y));
}
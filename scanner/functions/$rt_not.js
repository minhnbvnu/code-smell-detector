function $rt_not(x)
{
    if ($ir_is_int32(x))
    {
        return $ir_not_i32(x);
    }

    // Convert the operand to integers
    return $ir_not_i32($rt_toInt32(x));
}
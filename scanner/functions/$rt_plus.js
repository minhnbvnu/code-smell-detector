function $rt_plus(x)
{
    // If x is integer
    if ($ir_is_int32(x))
    {
        return x;
    }

    // If x is floating-point
    else if ($ir_is_float64(x))
    {
        return x;
    }

    return $rt_toNumber(x);
}
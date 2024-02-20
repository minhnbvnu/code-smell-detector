function $rt_modInt(x, y)
{
    // If x,y are integer
    if ($ir_is_int32(x) && $ir_is_int32(y) && $ir_ne_i32(y, 0))
    {
        return $ir_mod_i32(x, y);
    }

    return $rt_mod(x, y);
}
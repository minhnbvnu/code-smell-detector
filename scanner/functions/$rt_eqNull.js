function $rt_eqNull(x)
{
    if ($ir_is_null(x))
        return true;

    if ($ir_is_undef(x))
        return true;

    return false;
}
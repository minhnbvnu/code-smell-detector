function $rt_neNull(x)
{
    if ($ir_is_null(x))
        return false;

    if ($ir_is_undef(x))
        return false;

    return true;
}
function $rt_getPropElem(base, prop)
{
    // If the base is an array and the property is a non-negative integer
    if ($ir_is_array(base) && $ir_is_int32(prop) && $ir_ge_i32(prop, 0))
    {
        if ($ir_lt_i32(prop, $rt_getArrLen(base)))
        {
            var tbl = $rt_getArrTbl(base);
            var word = $rt_arrtbl_get_word(tbl, prop);
            var type = $rt_arrtbl_get_tag(tbl, prop);
            return $ir_make_value(word, type);
        }

        return $undef;
    }

    return $rt_getProp(base, prop);
}
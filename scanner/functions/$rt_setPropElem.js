function $rt_setPropElem(base, prop, val)
{
    // If the base is an array
    if ($ir_is_array(base))
    {
        // If the property is a non-negative integer
        if ($ir_is_int32(prop) && $ir_ge_i32(prop, 0))
        {
            // If the property is within the array bounds
            if ($ir_lt_i32(prop, $rt_getArrLen(base)))
            {
                // Get a reference to the array table
                var tbl = $rt_getArrTbl(base);

                // Set the element in the array
                $rt_arrtbl_set_word(tbl, prop, $ir_get_word(val));
                $rt_arrtbl_set_tag(tbl, prop, $ir_get_tag(val));
                return;
            }

            return $rt_setArrElem(base, prop, val);
        }
    }

    return $rt_setProp(base, prop, val);
}
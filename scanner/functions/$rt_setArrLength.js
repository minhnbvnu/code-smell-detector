function $rt_setArrLength(arr, newLen)
{
    // Get the current array length
    var len = $rt_getArrLen(arr);

    // Get a reference to the array table
    var tbl = $rt_getArrTbl(arr);

    // If the array length is increasing
    if (newLen > len)
    {
        // Get the array capacity
        var cap = $rt_arrtbl_get_cap(tbl);

        // If the new length would exceed the capacity
        if (newLen > cap)
        {
            // Compute the new size to resize to
            var newSize = $ir_mul_i32(cap, 2);
            if ($ir_gt_i32(newLen, newSize))
                newSize = newLen;

            // Extend the internal table
            $rt_extArrTbl(arr, tbl, len, newSize);
        }
    }
    else
    {
        // Set the removed entries to undefined
        for (var i = newLen; i < len; i++)
        {
            $rt_arrtbl_set_word(tbl, i, $ir_get_word(undefined));
            $rt_arrtbl_set_tag(tbl, i, $ir_get_tag(undefined));
        }
    }

    // Update the array length
    $rt_setArrLen(arr, newLen);
}
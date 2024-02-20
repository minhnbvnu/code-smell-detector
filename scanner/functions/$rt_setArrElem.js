function $rt_setArrElem(arr, index, val)
{
    // Get the array length
    var len = $rt_getArrLen(arr);

    // Get the array table
    var tbl = $rt_getArrTbl(arr);

    // If the index is past the current length
    if ($ir_ge_i32(index, len))
    {
        // Compute the new length
        var newLen = $ir_add_i32(index, 1);

        // Get the array capacity
        var cap = $rt_arrtbl_get_cap(tbl);

        // If the new length would exceed the capacity
        if ($ir_gt_i32(newLen, cap))
        {
            // Compute the new size to resize to
            var newSize = $ir_mul_i32(cap, 2);
            if ($ir_gt_i32(newLen, newSize))
                newSize = newLen;

            // Extend the internal table
            tbl = $rt_extArrTbl(arr, tbl, len, newSize);
        }

        // Update the array length
        $rt_setArrLen(arr, newLen);
    }

    // Set the element in the array
    $rt_arrtbl_set_word(tbl, index, $ir_get_word(val));
    $rt_arrtbl_set_tag(tbl, index, $ir_get_tag(val));
}
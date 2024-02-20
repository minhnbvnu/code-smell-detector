function $rt_extArrTbl(
    arr,
    curTbl,
    curLen,
    newSize
)
{
    // Allocate the new table without initializing it, for performance
    var newTbl = $rt_arrtbl_alloc(newSize);

    // Copy elements from the old table to the new
    for (var i = 0; $ir_lt_i32(i, curLen); i = $ir_add_i32(i, 1))
    {
        $rt_arrtbl_set_word(newTbl, i, $rt_arrtbl_get_word(curTbl, i));
        $rt_arrtbl_set_tag(newTbl, i, $rt_arrtbl_get_tag(curTbl, i));
    }

    // Update the table reference in the array
    $rt_setArrTbl(arr, newTbl);

    return newTbl;
}
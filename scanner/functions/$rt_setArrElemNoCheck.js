function $rt_setArrElemNoCheck(arr, index, val)
{
    // Get the array table
    var tbl = $rt_getArrTbl(arr);

    // Set the element in the array
    $rt_arrtbl_set_word(tbl, index, $ir_get_word(val));
    $rt_arrtbl_set_tag(tbl, index, $ir_get_tag(val));
}
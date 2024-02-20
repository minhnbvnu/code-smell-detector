function $rt_newArr(length)
{
    // Allocate the array table
    var tblPtr = $rt_arrtbl_alloc(length);

    // Allocate the array
    var objPtr = $rt_arr_alloc($rt_OBJ_MIN_CAP);

    // Initialize the array object
    $ir_arr_init_shape(objPtr);
    $rt_setProto(objPtr, $ir_get_arr_proto());
    $rt_setArrTbl(objPtr, tblPtr);
    $rt_obj_set_tag(objPtr, $rt_ARRTBL_SLOT_IDX, $ir_get_tag(tblPtr));

    // Set the array length
    $rt_setArrLen(objPtr, length);

    // If shapes are not to be propagated, clear shape information
    if ($ir_break());
    $ir_clear_shape(objPtr);

    return objPtr;
}
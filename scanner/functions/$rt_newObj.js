function $rt_newObj(protoPtr)
{
    // Allocate the object
    var objPtr = $rt_obj_alloc($rt_OBJ_MIN_CAP);

    // Initialize the object
    $ir_obj_init_shape(objPtr, protoPtr);
    $rt_setProto(objPtr, protoPtr);

    // If shapes are not to be propagated, clear shape information
    if ($ir_break());
    $ir_clear_shape(objPtr);

    return objPtr;
}
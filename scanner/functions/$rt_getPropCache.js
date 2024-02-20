function $rt_getPropCache(obj, propStr)
{
    // Read the object shape
    var shapeIdx = $ir_read_shape_idx(obj);
    if ($ir_break());

    // Capture the object shape
    while (true)
    {
        if ($ir_capture_shape(obj, shapeIdx))
            break;
    }

    // If the property value can be read directly
    var propVal;
    if (propVal = $ir_obj_get_prop(obj, propStr))
    {
        // If shapes are not to be propagated, clear shape information
        $ir_clear_shape(obj);

        // Return the property value
        return propVal;
    }
    else
    {
        // If shapes are not to be propagated, clear shape information
        $ir_clear_shape(obj);

        // Throw the property value
        $ir_throw(propVal);
    }
}
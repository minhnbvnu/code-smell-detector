function $rt_setPropCache(obj, propStr, val)
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

    // Capture the type tag of the value
    if ($ir_capture_tag(val))
    if ($ir_capture_tag(val))
    if ($ir_capture_tag(val))
    if ($ir_capture_tag(val))
    if ($ir_capture_tag(val))
    if ($ir_capture_tag(val))
    if ($ir_capture_tag(val))
    if ($ir_capture_tag(val))
    if ($ir_capture_tag(val))
    if ($ir_capture_tag(val))
    if ($ir_capture_tag(val))
    if ($ir_capture_tag(val))
    if ($ir_capture_tag(val))
    if ($ir_capture_tag(val))
    if ($ir_capture_tag(val))
    if ($ir_capture_tag(val));

    // If the property value can be written directly
    var propVal;
    if ($ir_obj_set_prop(obj, propStr, val))
    {
        // If shapes are not to be propagated, clear shape information
        $ir_clear_shape(obj);

        // Property value written
        return true;
    }
    else
    {
        // If shapes are not to be propagated, clear shape information
        $ir_clear_shape(obj);

        // Property value not written
        $ir_throw(false);
    }
}
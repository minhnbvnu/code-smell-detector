function $rt_getPropEnum(curObj, propName, propIdx)
{
    // If this is an object
    if ($ir_is_object(curObj) && $ir_lt_i32(propIdx, $rt_obj_get_cap(curObj)))
    {
        // Read the object shape
        var shapeIdx = $ir_read_shape_idx(curObj);
        if ($ir_break());

        // Capture the object shape
        while (true)
        {
            if ($ir_capture_shape(curObj, shapeIdx))
                break;
        }

        // Get the property enumeration table for the current object
        var enumTbl = $ir_obj_enum_tbl(curObj);
        var tblLen = $rt_arrtbl_get_cap(enumTbl);

        // If shapes are not to be propagated, clear shape information
        $ir_clear_shape(curObj);

        // Compute the enum table index for the property attributes
        var attrIdx = $ir_add_i32($ir_lsft_i32(propIdx, 1), 1);

        // Get the name attributes this property
        var attrs = $rt_arrtbl_get_word(enumTbl, attrIdx);

        // If the property is enumerable and not a getter-setter
        if ($ir_ne_i32(0, $ir_and_i32(attrs, $rt_ATTR_ENUMERABLE)) &&
            $ir_eq_i32(0, $ir_and_i32(attrs, $rt_ATTR_GETSET)))
        {
            // Read the property at the property index directly
            var word = $rt_obj_get_word(curObj, propIdx);
            var type = $rt_obj_get_tag(curObj, propIdx);
            return $ir_make_value(word, type);
        }
    }

    // Fall back to the array element read
    return $rt_getPropElem(curObj, propName);
}
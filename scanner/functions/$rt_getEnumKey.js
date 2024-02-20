function $rt_getEnumKey(topObj, curObj, propIdx)
{
    //print('getEnumProp, idx =', propIdx);

    // If the current object is an object of some kind
    if ($rt_valIsObj(curObj))
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

        // Compute the enum table index for the property name
        var nameIdx = $ir_lsft_i32(propIdx, 1);

        // If we are still within the property enumeration table
        if ($ir_lt_i32(nameIdx, tblLen))
        {
            // Get the name for this property
            var propName = $ir_load_string(
                enumTbl,
                $rt_arrtbl_ofs_word(
                    enumTbl,
                    nameIdx
                )
            );

            // If this property is not enumerable, skip it
            if ($ir_eq_refptr(propName, null))
                return null;

            // If the property is shadowed, skip it
            if ($rt_isShadowed(topObj, curObj, propName))
                return null;

            // Return the current key
            return propName;
        }

        // If the object is an array
        if ($ir_is_array(curObj))
        {
            // If this is a valid array index
            var arrIdx = propIdx - $ir_rsft_i32(tblLen, 1);
            if ($ir_lt_i32(arrIdx, curObj.length))
                return arrIdx;
        }

        // No more properties to enumerate
        return true;
    }

    // If the object is a string
    else if ($ir_is_string(curObj))
    {
        // If this is a valid character index
        if ($ir_lt_i32(propIdx, curObj.length))
            return propIdx;

        // No more properties to enumerate
        return true;
    }

    else
    {
        // No properties to enumerate
        return true;
    }
}
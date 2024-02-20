function $rt_delProp(base, prop)
{
    // If the base is not an object, do nothing
    if (!$ir_is_object(base) && !ir_is_array(base) && !ir_is_closure(base))
        return true;

    // If the property is not a string
    if (!$ir_is_string(prop))
        throw TypeError('non-string property name');

    // Get the attributes for the shape
    var attrs = $ir_obj_get_attrs(base, prop);

    // If the property is not configurable, stop
    if (!(attrs & $rt_ATTR_CONFIGURABLE))
        return false;

    // Set the property value to undefined
    if ($ir_obj_set_prop(base, prop, $undef))
    {
    }
    else
    {
        // For accessors, do nothing
    }

    // Set the property attributes to deleted and
    // preserve the current extensible status
    $ir_obj_set_attrs(
        base,
        prop,
        $rt_ATTR_DELETED |
        $rt_ATTR_CONFIGURABLE |
        (attrs & $rt_ATTR_EXTENSIBLE)
    );

    return true;
}
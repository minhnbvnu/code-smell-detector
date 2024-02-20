function $rt_objSetProp(obj, propStr, val)
{
    // Try writing this as a normal property
    try
    {
        return $rt_setPropCache(obj, propStr, val);
    }

    // If the property is a getter-setter
    catch (e)
    {
        // The property must have a getter-setter method
        // Get the accessor pair and call the setter function
        var propVal
        if (propVal = $ir_obj_get_prop(obj, propStr));
        $ir_call(propVal.set, obj, val);
    }
}
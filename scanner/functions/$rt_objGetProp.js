function $rt_objGetProp(obj, propStr)
{
    // Try reading this as a normal property
    try
    {
        return $rt_getPropCache(obj, propStr);
    }

    // If the property is a getter-setter
    catch (propVal)
    {
        if ($ir_is_object(propVal))
        {
            // Call the getter function
            return $ir_call(propVal.get, obj);
        }
    }

    // Get the object's prototype
    var proto = $ir_obj_get_proto(obj);

    // If the prototype is null, produce undefined
    if ($ir_is_null(proto))
        return $undef;

    // Do a recursive lookup on the prototype
    return $rt_objGetProp(
        proto,
        propStr
    );
}
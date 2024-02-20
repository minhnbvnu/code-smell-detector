function $rt_getGlobal(obj, propStr)
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
            return $rt_getProp(obj, propStr);
        }
    }

    // Get the object's prototype
    var proto = $ir_obj_get_proto(obj);

    // If the prototype is null, the property is not defined
    if ($ir_is_null(proto))
    {
        //$ir_print_str(propStr); $ir_print_str('\n');

        var errStr = 'global property not defined: "' + propStr + '"';
        if (obj.ReferenceError)
            throw ReferenceError(errStr);
        else
            throw errStr;
    }

    // Do a recursive lookup on the prototype
    return $rt_getGlobal(
        proto,
        propStr
    );
}
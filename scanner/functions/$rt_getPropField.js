function $rt_getPropField(base, propStr)
{
    // If the base is a simple object
    if ($ir_is_object(base) || $ir_is_closure(base) || $ir_is_array(base))
    {
        var obj = base;

        // Note: BBV cannot propagate object shape from loop construct
        // shape is found for phi node inside loop but not propagated for
        // the object value flowing into the phi node

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

        // Get the prototype of the object
        var obj = $ir_obj_get_proto(obj);

        // If we have reached the end of the prototype chain
        if ($ir_is_null(obj))
        {
            return $undef;
        }

        // Until we reach the end of the prototype chain
        for (;;)
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

            // Get the prototype of the object
            var obj = $ir_obj_get_proto(obj);

            // If we have reached the end of the prototype chain
            if ($ir_is_null(obj))
            {
                return $undef;
            }
        }
    }

    return $rt_getProp(base, propStr);
}
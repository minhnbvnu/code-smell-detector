function $rt_isShadowed(topObj, thisObj, propName)
{
    for (var curObj = topObj;;)
    {
        // If we reached this object, stop
        if ($ir_eq_refptr(curObj, thisObj))
            return false;

        // If the property exists on this object, it is shadowed
        if ($rt_hasOwnProp(curObj, propName))
            return true;

        // Move one down the prototype chain
        curObj = $ir_obj_get_proto(curObj);
    }

    assert (false);
}
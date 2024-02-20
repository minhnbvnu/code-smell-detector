function $rt_in(prop, obj)
{
    if (!$rt_valIsObj(obj))
        throw TypeError('invalid object passed to "in" operator');

    // Until we went all the way through the prototype chain
    do
    {
        if ($rt_hasOwnProp(obj, prop))
            return true;

        obj = $ir_obj_get_proto(obj);

    } while ($ir_ne_refptr(obj, null));

    return false;
}
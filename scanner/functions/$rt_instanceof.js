function $rt_instanceof(obj, ctor)
{
    if (!$ir_is_closure(ctor))
        throw TypeError('constructor must be function');

    // If the value is not an object
    if (!$rt_valIsObj(obj))
    {
        // Return the false value
        return false;
    }

    // Get the prototype for the constructor function
    var ctorProto = ctor.prototype;

    // Until we went all the way through the prototype chain
    do
    {
        var objProto = $ir_obj_get_proto(obj);

        if ($ir_eq_refptr(objProto, ctorProto))
            return true;

        obj = objProto;

    } while ($ir_ne_refptr(obj, null));

    return false;
}
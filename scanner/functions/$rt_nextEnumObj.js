function $rt_nextEnumObj(curObj)
{
    //print('nextEnumObj');

    // If the current object is an object of some kind
    if ($rt_valIsObj(curObj))
    {
        // Move up the prototype chain
        return $ir_obj_get_proto(curObj);
    }

    // If the object is a string
    if ($ir_is_string(curObj))
    {
        // Move up the prototype chain
        return $ir_get_str_proto();
    }

    return null;
}
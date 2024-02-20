function $rt_setProto(obj, proto)
{
    // Write the prototype pointer
    $rt_obj_set_word(obj, $rt_PROTO_SLOT_IDX, proto);

    // Write the prototype tag
    $rt_obj_set_tag(obj, $rt_PROTO_SLOT_IDX, $ir_get_tag(proto));
}
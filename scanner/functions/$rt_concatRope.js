function $rt_concatRope(rope, rightStr)
{
    var ropeLen = $rt_rope_get_len(rope);

    // Allocate a string object for the output
    var dstStr = $rt_str_alloc(ropeLen);

    // Output string data pointer
    var dataO = $ir_add_ptr_i32(dstStr, $rt_str_ofs_data(null, 0));
    var idxO = $ir_lsft_i32(ropeLen, 1);

    // Until we are done traversing the ropes
    for (var curRope = rope;;)
    {
        // The right-hand node must be a string
        var rightLen = $rt_str_get_len(rightStr);

        // Right string data pointers
        var dataI = $ir_add_ptr_i32(rightStr, $rt_str_ofs_data(null, 0));
        var idxI = $ir_lsft_i32(rightLen, 1);

        // Copy the string characters
	    while ($ir_ne_i32(idxI, 0))
	    {
            idxI = $ir_sub_i32(idxI, 2);
            idxO = $ir_sub_i32(idxO, 2);
            $ir_store_u16(dataO, idxO, $ir_load_u16(dataI, idxI));
	    }

        // Move to the next rope
        curRope = $rt_rope_get_left(curRope);

        // If this is the last string in the chain, stop
        if ($ir_eq_i32($rt_rope_get_header(curRope), $rt_LAYOUT_STR))
        {
            var leftStr = curRope;
            break;
        }

        // Get the right-hand string for the current rope
        rightStr = $rt_rope_get_right(curRope);

        // If the rope was already converted to a string
        if ($ir_eq_refptr(rightStr, null))
        {
            var leftStr = $rt_rope_get_left(curRope);
            break;
        }
    }

    // Copy the last string
    var leftLen = $rt_str_get_len(leftStr);

    // Left string data pointers
    var dataI = $ir_add_ptr_i32(leftStr, $rt_str_ofs_data(null, 0));
    var idxI = $ir_lsft_i32(leftLen, 1);

    // Copy the string characters
    while ($ir_ne_i32(idxI, 0))
    {
        idxI = $ir_sub_i32(idxI, 2);
        idxO = $ir_sub_i32(idxO, 2);
        $ir_store_u16(dataO, idxO, $ir_load_u16(dataI, idxI));
    }

    // Get the corresponding string from the string table
    dstStr = $ir_get_str(dstStr);

    // Cache the concatenated string in the original rope
    $rt_rope_set_left(rope, dstStr);
    $rt_rope_set_right(rope, null);

    return dstStr;
}
function $rt_ropeToStr(rope)
{
    // Get the right-hand string
    var rightStr = $rt_rope_get_right(rope);

    // If this rope was already converted to a string
    if ($ir_eq_refptr(rightStr, null))
    {
        return $ir_load_string(rope, $rt_rope_ofs_left(rope));
    }

    return $rt_concatRope(rope, rightStr);
}
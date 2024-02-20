function eval(input)
{
    if ($ir_is_string(input) || $ir_is_rope(input))
        return $ir_eval_str($rt_toString(input));

    return input;
}
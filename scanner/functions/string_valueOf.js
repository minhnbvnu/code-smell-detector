function string_valueOf()
{
    if ($ir_is_string(this))
        return this;

    if ($ir_is_rope(this))
        return $rt_ropeToStr(this);

    if (this instanceof String)
        return this.value;

    return this;
}
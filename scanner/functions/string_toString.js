function string_toString()
{
    if ($ir_is_string(this))
        return this;

    if ($ir_is_rope(this))
        return $rt_ropeToStr(this);

    if (this instanceof String)
        return this.value;

    throw TypeError('unexpected type in String.prototype.toString');
}
function string_slice(start, end)
{
    var source = this.toString();
    var length = $rt_str_get_len(source);

    if (start === $undef)
        start = 0;
    if (end === $undef)
        end = length;

    if (start < 0)
        start += length;
    if (end < 0)
        end += length;

    return string_substring.call(this, start, end);
}
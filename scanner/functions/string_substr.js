function string_substr(start, length)
{
    var end = (length === undefined) ? undefined:(start + length);

    return string_substring.apply(this, [start, end]);
}
function string_trim()
{
    var from = 0, to = this.length - 1;

    while (string_internal_isWhiteSpace(this.charCodeAt(from)))
        ++from;

    while (string_internal_isWhiteSpace(this.charCodeAt(to)))
        --to;

    if (from > to)
        return "";
    else
        return this.substring(from, to + 1);
}
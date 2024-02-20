function unescapedClassFilter(c)
{
    return ((c >= 65 && c <= 90) || (c >= 97 && c <= 122) ||
            (c >= 48 && c <= 57) || (c >= 39 && c <= 42)  ||
            c === 45 || c === 95 || c === 46 || c === 33  ||
            c === 126)
}
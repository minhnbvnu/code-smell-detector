function string_internal_utf16encoding(cp)
{
    assert(cp >= 0 && cp <= 0x10FFFF);

    if (cp < 65535) return [cp];

    var cu1 = Math.floor((cp - 65536) / 1024) + 0xD800;
    var cu2 = ((cp - 65536) % 1024) + 0xDC00;

    return [cu1, cu2];
}
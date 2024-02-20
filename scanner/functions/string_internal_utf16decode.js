function string_internal_utf16decode(lead, trail)
{
    assert(0xD800 <= lead && lead <= 0xDBFF);
    assert(0xDC00 <= trail && trail <= 0xDFFF);
    return (lead - 0xD800) * 1024 + (trail - 0xDC00) + 0x10000;
}
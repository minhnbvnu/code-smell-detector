function test_fromCodePoint()
{
    assertThrows(function () {
        String.fromCodePoint(17.5);
    });
    assertThrows(function () {
        String.fromCodePoint(-5);
    });
    assertThrows(function () {
        String.fromCodePoint(0x11FFFF);
    });

    assert(String.fromCodePoint(102, 111, 111) === 'foo');
    assert(String.fromCodePoint(0x1F0A1, 0x1F0B1, 0x1F0C1, 0x1F0D1) === '🂡🂱🃁🃑');
    assert(String.fromCodePoint(102, 0x1F0A1, 111, 111) === 'f🂡oo');
}
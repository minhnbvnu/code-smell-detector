function test_codePointAt()
{
    var codePointAt = String.prototype.codePointAt;

    assertThrows(function () {
        codePointAt.call(null);
    });
    assertThrows(function () {
        codePointAt.call(null);
    });

    assert('foo'.codePointAt(0) === 102);
    assert('foo'.codePointAt(1) === 111);
    assert('foo'.codePointAt(2) === 111);
    assert('🂡'.codePointAt(0) === 0x1F0A1);
    assert('🂡f'.codePointAt(2) === 102);
}
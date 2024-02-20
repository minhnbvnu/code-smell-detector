function test_parse_convert()
{
    reset();

    var o = require('lib/options.js')
        .add('intval', null, 'int')
        .add('floatval', null, 'float')
        .add('yes', null, 'boolean')
        .add('off', null, 'boolean')
        .add('false', null, 'boolean')
        .add('one', null, 'boolean');

    var r = o.parse(['--intval=3', '--floatval=0.5', '--yes=yes', '--off=off', '--false=false', '--one=1']);

    assertEq(r.intval, 3);
    assertEq(r.floatval, 0.5);
    assert(r.yes);
    assert(!r.off);
    assert(!r.false);
}
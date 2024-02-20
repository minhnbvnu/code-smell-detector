function test_parse_result()
{
    reset();

    var o = require('lib/options.js')
        .add('long', null)
        .add('double', null, null, null, 'd')
        .add(null, null, 'boolean', null, 's');

    var r = o.parse(['--long=val1', '-sd=val2', 'arg1', 'arg2', 'arg3']);

    assertEqArray(r._, ['arg1', 'arg2', 'arg3']);
    assertEq(r.long, 'val1');
    assertEq(r.d, 'val2');
    assertEq(r.double, 'val2');
    assert(r.s);
}
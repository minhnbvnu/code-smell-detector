function test_parse_defval()
{
    reset();

    var o = require('lib/options.js')
        .add('default', 'qwerty', null, null, 'D');

    var r = o.parse([]);

    assertEq(r.default, 'qwerty');
    assertEq(r.D, 'qwerty');
}
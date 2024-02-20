function test_parseArgv()
{
    var argv = ['arg1', '--longbool', '--longval=val', '-abc', 'arg2', '-def=val'];

    var p = options._parseArgv(argv);

    assertEqArray(p.args, ['arg1', 'arg2']);

    assert(p.opts.longbool);
    assertEq(p.opts.longval, 'val');
    assert(p.opts.a);
    assert(p.opts.b);
    assert(p.opts.c);
    assert(p.opts.d);
    assert(p.opts.e);
    assertEq(p.opts.f, 'val');
}
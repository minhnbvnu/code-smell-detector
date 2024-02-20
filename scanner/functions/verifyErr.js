function verifyErr(context)
{
    assert (
        exc !== undefined
    );
    assert (
        exc instanceof TypeError,
        context + ': exception is not a TypeError (typeof is ' + typeof exc + ')'
    );
    assert (
        exc.toString().indexOf('foo') !== -1,
        context + ': error string does not specify function name'
    );
}
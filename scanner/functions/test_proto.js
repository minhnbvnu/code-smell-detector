function test_proto()
{
    var fProto = Function.prototype;

    assert (fProto.isPrototypeOf(Function.prototype.toString));

    assert (fProto.isPrototypeOf(Object.prototype.hasOwnProperty));
}
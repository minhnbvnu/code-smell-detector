function shouldThrow(a)
{
    var evalA;
    try {
        eval(a);
    } catch(e) {
        pass(a + " threw: " + e);
        return;
    }

    fail(a + " did not throw an exception.");
}
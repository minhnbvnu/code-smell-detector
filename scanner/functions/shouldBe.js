function shouldBe(a, b)
{
    var evalA;
    try {
        evalA = eval(a);
    } catch(e) {
        evalA = e;
    }
    
    if (evalA == b || isNaN(evalA) && typeof evalA == 'number' && isNaN(b) && typeof b == 'number')
        pass(a + " should be " + b + " and is.");
    else
        fail(a + " should be " + b + " but instead is " + evalA + ".");
}
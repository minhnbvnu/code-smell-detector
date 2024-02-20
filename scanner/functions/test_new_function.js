function test_new_function()
{
    var a = {
        toString: function()
        {
            return 'a';
        }
    };

    var b = [];
    b.toString = function()
    {
        return 'b'
    };

    var c = {
        toString: function()
        {
            return 'return 1';
        }
    };

    // Valid function constructions
    assertEq(new Function()(),
             undefined,
             "Function() should make an empty function."
    );

    assertEq(new Function(c)(),
             1,
             "Function(body) should make a function with that body."
    );

    assertEq(new Function('a', 'b', 'return a + b')(2, 3),
             5,
             "Function(args..., body) should make a function with the " +
             "given arguments and body."
    );

    assertEq(new Function('a, b', 'c', 'return a + b + c')(1, 2, 3),
             6,
             "Any string should be valid for the argument names, as long " +
             "as they turn into a valid FormalParameterList."
    );

    assertEq(new Function(a, b, 'return a + b')(2, 3),
             5,
             "All argument names should be converted with ToString(a), " +
             "the resulting argument should be a valid part of " +
             "FormalParameterList."
    );

    // Invalid function constructions
    assertThrows(function()
                 {
                     new Function('a-b', 'return a + b')(2, 3);
                 },
                 "(1) Invalid FormalParameterLists should throw a SyntaxError."
    );

    assertThrows(function()
                 {
                     new Function('a){ global = {}', 'return a + 1')();
                 },
                 "(2) Invalid FormalParameterLists should throw a SyntaxError."
    );

    assertThrows(function()
                 {
                     new Function('return }')();
                 },
                 "Unbalanced brackets in the FunctionBody should throw a SyntaxError."
    );

    assertThrows(function()
                 {
                     new Function('return "')();
                 },
                 "(1) Unterminated strings in the FunctionBody should throw a " +
                 "SyntaxError."
    );

    assertThrows(function()
                 {
                     new Function("return '")();
                 },
                 "(2) Unterminated strings in the FunctionBody should throw a " +
                 "SyntaxError."
    );

    assertThrows(function()
                 {
                     new Function('return "foo\n"')();
                 },
                 "(3) Unterminated strings in the FunctionBody should throw a " +
                 "SyntaxError."
    );

    assertThrows(function()
                 {
                     new Function("return /** /")();
                 },
                 "Unterminated block commants in the FunctionBody should throw " +
                 "a SyntaxError."
    );

    assertThrows(function()
                 {
                     new Function("return var a = 1")();
                 },
                 "Otherwise invalid FunctionBody should be caught by the Higgs " +
                 "parser and throw a SyntaxError."
    );
}
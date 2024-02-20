function test_convertValue()
{
    assertEq(options._convertValue('3.14', 'float'), 3.14);
    assertEq(options._convertValue('-3.14', 'float'), -3.14);
    assertEq(options._convertValue('3.14', '+float'), 3.14);
    assertEq(options._convertValue('3', 'int'), 3);
    assertEq(options._convertValue('-3', 'int'), -3);
    assertEq(options._convertValue('3', '+int'), 3);
    assertEq(options._convertValue(true, 'boolean'), true);
    assertEq(options._convertValue('1', 'boolean'), true);
    assertEq(options._convertValue('on', 'boolean'), true);
    assertEq(options._convertValue('yes', 'boolean'), true);
    assertEq(options._convertValue('true', 'boolean'), true);
    assertEq(options._convertValue(false, 'boolean'), false);
    assertEq(options._convertValue('0', 'boolean'), false);
    assertEq(options._convertValue('off', 'boolean'), false);
    assertEq(options._convertValue('no', 'boolean'), false);
    assertEq(options._convertValue('false', 'boolean'), false);
}
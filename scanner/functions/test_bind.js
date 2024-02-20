function test_bind() 
{
    var testObj = {
        x: ["x"],
        func: function() { return this.x.concat(arguments); }
    };

    //Dotted
    assertEqArray(
            testObj.func("arg1", "arg2"),
            ["x", "arg1", "arg2"],
            "Unbound function should work as a member.");

    //Unbound
    x = ["outerX"];
    var unbound = testObj.func;
    assertEqArray(
            unbound("arg1", "arg2"),
            ["outerX", "arg1", "arg2"],
            "Unbound function should use outer `this`.");

    //Bound
    var bound = testObj.func.bind(testObj, "boundArg1", "boundArg2");
    assertEqArray(
            bound("arg1", "arg2"),
            ["x", "boundArg1", "boundArg2", "arg1", "arg2"],
            "Function should be bound to testObj and two parameters.");


    //Bound "this" identity
    var getThis = function() { return this; };
    assertNotEq(getThis(), testObj,
            "getThis should not be bound.");

    var getThat = getThis.bind(testObj);
    assertEq(getThat(), testObj,
            "getThat should be bound to testObj.");


    //Unbound constructor
    function ArgArray() { this.args = [].concat(arguments); }
    assertEqArray(new ArgArray("arg").args, ["arg"],
            "Unbound constructor should work normally.");

    //Bound constructor
    var dummy = { ignore : true };
    var BoundArgArray = ArgArray.bind(dummy, "boundArg");
    var argArray = new BoundArgArray("arg");
    assertEqArray(
            argArray.args,
            ["boundArg", "arg"],
            "Bound constructor should initialize the created object.");
    assertNotEq(argArray, dummy,
            "Bound constructor should not initialize the object it's bound to.");
    assertFalse(argArray.ignore,
            "Created object should not inherit from the object that " +
            "the constructor is bound to.");
    assertTrue(argArray instanceof BoundArgArray,
            "Created oject should be an instance of the bound function.");
    assertTrue(argArray instanceof ArgArray,
            "Created oject should be an instance of the unbound function.");

    //Inheritance
    assertFalse('getArgs' in argArray,
            "Bound object should not yet have the getArgs method.");
    ArgArray.prototype.getArgs = function() { return this.args; }
    assertTrue('getArgs' in argArray,
            "Bound object should inherit getArgs after it is added to " +
            "unbound functions prototype.");
    assertEqArray(argArray.getArgs(), argArray.args,
            "Inherited getArgs method should run in the created object.");

    return 0;
}
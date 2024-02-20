function testException(exception, global, desc) {
  // https://heycam.github.io/webidl/#es-exception-objects
  // (as of 2015-01-03): "The value of the internal [[Prototype]] property of a
  // DOMException object MUST be the DOMException prototype object from the
  // global environment the exception object is associated with."
  test(function() {
    assert_equals(global.Object.getPrototypeOf(exception),
                  global.DOMException.prototype);
  }, desc + "Object.getPrototypeOf(exception) === DOMException.prototype");


  // https://heycam.github.io/webidl/#es-creating-throwing-exceptions
  // (as of 2015-01-03): "Call the [[DefineOwnProperty]] internal method of /O/
  // passing “name”, Property Descriptor { [[Value]]: /N/, [[Writable]]: true,
  // [[Enumerable]]: true, [[Configurable]]: true }, and false as arguments."
  test(function() {
    assert_true(exception.hasOwnProperty("name"));
  }, desc + "exception.hasOwnProperty(\"name\")");

  test(function() {
    assert_equals(exception.name, "HierarchyRequestError");
  }, desc + "exception.name === \"HierarchyRequestError\"");

  test(function() {
    var desc = global.Object.getOwnPropertyDescriptor(exception, "name");
    assert_true(desc.writable, "must be writable");
    assert_true(desc.enumerable, "must be enumerable");
    assert_true(desc.configurable, "must be configurable");
  }, desc + "Object.getOwnPropertyDescriptor(exception, \"name\")");


  // https://heycam.github.io/webidl/#es-creating-throwing-exceptions
  // (as of 2015-01-03): "If the optional user agent-defined message /M/ was
  // specified, then this list has a single element whose value is the result
  // of converting /M/ to a String value. Otherwise, the list is empty."
  //
  // https://heycam.github.io/webidl/#es-DOMException-constructor-object
  // (as of 2015-01-03): "Call the [[DefineOwnProperty]] internal method of /O/
  // passing “message”, Property Descriptor { [[Value]]: /S/,
  // [[Writable]]: true, [[Enumerable]]: false, [[Configurable]]: true }, and
  // false as arguments."
  test(function() {
    if (exception.hasOwnProperty("message")) {
      var desc = global.Object.getOwnPropertyDescriptor(exception, "message");
      assert_true(desc.writable, "must be writable");
      assert_false(desc.enumerable, "must not be enumerable");
      assert_true(desc.configurable, "must be configurable");
    }
  }, desc + "Object.getOwnPropertyDescriptor(exception, \"message\")");

  test(function() {
    if (exception.hasOwnProperty("message")) {
      // Can't test anything more specific, since it's implementation-defined :(
      assert_equals(typeof exception.message, "string");
    } else {
      // Error.prototype.message
      assert_equals(exception.message, "");
    }
  }, desc + "typeof exception.message === \"string\"");


  // https://heycam.github.io/webidl/#es-exception-objects
  // (as of 2015-01-03): "The class string of a DOMException object MUST be
  // “DOMException”."
  test(function() {
    assert_equals(global.Object.prototype.toString.call(exception),
                  "[object DOMException]");
  }, desc + "Object.prototype.toString.call(exception) === \"[object DOMException]\"");


  // https://heycam.github.io/webidl/#es-creating-throwing-exceptions
  // (as of 2015-01-03): "Call the [[DefineOwnProperty]] internal method of /O/
  // passing “code”, Property Descriptor { [[Value]]: /code/,
  // [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true }, and
  // false as arguments."
  test(function() {
    assert_equals(exception.code, global.DOMException.HIERARCHY_REQUEST_ERR);
  }, desc + "exception.code === DOMException.HIERARCHY_REQUEST_ERR");

  test(function() {
    var desc = global.Object.getOwnPropertyDescriptor(exception, "code");
    assert_true(desc.writable, "must be writable");
    assert_true(desc.enumerable, "must be enumerable");
    assert_true(desc.configurable, "must be configurable");
  }, desc + "Object.getOwnPropertyDescriptor(exception, \"code\")");
}
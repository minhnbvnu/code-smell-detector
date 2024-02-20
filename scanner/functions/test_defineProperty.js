function test_defineProperty()
{
    //Object.defineProperty = function (obj, prop, attribs)

    var o = {};

    // Properties are not enumerable by default
    Object.defineProperty(o, 'p', { value: 7 });
    assert (o.p === 7);
    assert (!o.propertyIsEnumerable('p'));

    // Properties are not writable by default
    o.p = 8;
    assert (o.p === 7);
    o.p++;
    assert (o.p === 7);

    // Properties are not configurable by default
    // Changing the value of p should fail
    assertThrows(function () {
        Object.defineProperty(o, 'p', { value: 9, writable:true });
    });

    // Defining a non-enumerable property
    var obj = Object.defineProperty({}, 'k', { value: 3, enumerable:false });
    assert (obj.k === 3);
    assert (!obj.propertyIsEnumerable('k'));

    var obj = Object.defineProperty({}, 'x', { value: true, enumerable:true });
    assert (obj.x === true);
    assert (obj.propertyIsEnumerable('x'));

    // Empty property descriptor
    var obj = Object.defineProperty({}, 'x', {});
    assert ('x' in obj);
    assert (obj.x === undefined);

    // Cannot delete non-configurable properties
    var obj = Object.defineProperty({}, 'p', { value:5 });
    delete obj.p;
    assert (obj.p === 5);

    // Undeleting a property
    var obj = { k:3 }
    delete obj.k;
    Object.defineProperty(obj, 'k', {});
    assert ('k' in obj);
    assert (obj.k === undefined);

    // Getter accessor test
    var obj = Object.defineProperty({}, 'p', { get: function() {return 5;} });
    assert (obj.p === 5);
    obj.p = 7;
    assert (obj.p === 5);

    // Setter accessor test
    var obj = Object.defineProperty({}, 'p', { set: function(v) {this.k=v} });
    obj.p = 5;
    assert (obj.k === 5, 'setter failed');
    obj.p = 7;
    assert (obj.k === 7);
    assert (obj.p === undefined);

    // Can't have both a value and a getter/setter
    assertThrows(function () {
        Object.defineProperty({}, 'p', { value: 9, set:function() {} });
    });
    assertThrows(function () {
        Object.defineProperty({}, 'p', { value: 9, get:function() {} });
    });
}
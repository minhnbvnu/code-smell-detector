function assertQuatEqual(q1, q2, precision = 15, message = 'Quaternion comparaison') {
    try {
        assertFloatEqual(q1._x, q2._x, '_x not equal', precision);
        assertFloatEqual(q1._y, q2._y, '_y not equal', precision);
        assertFloatEqual(q1._z, q2._z, '_z not equal', precision);
        assertFloatEqual(q1._w, q2._w, '_w not equal', precision);
    } catch (e) {
        if (e instanceof assert.AssertionError) {
            assert.fail(`${message}\n${e}\nExpected : ${quaternionToString(q1)}\nActual : ${quaternionToString(q2)}`);
        } else {
            assert.fail(e);
        }
    }
}
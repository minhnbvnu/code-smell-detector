function testQuaternionFromAttitude(input, expected, precision = 15) {
    const actual = OrientationUtils.quaternionFromAttitude(input);
    const message = `Input should be parsed properly : ${input}`;

    assertQuatEqual(expected, actual, precision, message);
}
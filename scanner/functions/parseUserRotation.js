function parseUserRotation(angleText, phaseText, axisText) {
    let w = parseUserAngle(angleText);
    let phase = parseUserAngle(phaseText);
    let {x, y, z} = Axis.parse(axisText);

    let len = Math.sqrt(x*x + y*y + z*z);
    x /= len;
    y /= len;
    z /= len;

    let [I, X, Y, Z] = [Matrix.identity(2), Matrix.PAULI_X, Matrix.PAULI_Y, Matrix.PAULI_Z];
    let axisMatrix = X.times(x).plus(Y.times(y)).plus(Z.times(z));

    let result = I.times(Math.cos(w/2)).
        plus(axisMatrix.times(Complex.I.neg()).times(Math.sin(w/2))).
        times(Complex.polar(1, phase));
    if (result.hasNaN()) {
        throw new DetailedError("NaN", {x, y, z, result});
    }

    return decreasePrecisionAndSerializedSize(result);
}
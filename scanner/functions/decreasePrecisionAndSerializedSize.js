function decreasePrecisionAndSerializedSize(matrix) {
    return Matrix.parse(matrix.toString(new Format(true, 0.0000001, 7, ",")))
}
function MAT3x3_MATMUL_XYZ(A, v, c) {
    const x = v.x, y = v.y, z = v.z;
    c.x = A[0][0] * x + A[0][1] * y + A[0][2] * z;
    c.y = A[1][0] * x + A[1][1] * y + A[1][2] * z;
    c.z = A[2][0] * x + A[2][1] * y + A[2][2] * z;
}
function MAT2x2_MATMUL_XZ(A, v, c) {
    const x = v.x, z = v.z;
    c.x = A[0][0] * x + A[0][1] * z;
    c.z = A[1][0] * x + A[1][1] * z;
}
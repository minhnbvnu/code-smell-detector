function MAT2x2_MATMUL_XY(A, v, c) {
    const x = v.x, y = v.y;
    c.x = A[0][0] * x + A[0][1] * y;
    c.y = A[1][0] * x + A[1][1] * y;
}
function applyMatrix(out, v, e) {
    const x = v[0], y = v[1], z = v[2];
    // const e = in;

    const w = 1 / (e[ 3 ] * x + e[ 7 ] * y + e[ 11 ] * z + e[ 15 ]);

    out[0] = (e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z + e[ 12 ]) * w;
    out[1] = (e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z + e[ 13 ]) * w;
    out[2] = (e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ]) * w;

    return out;
}
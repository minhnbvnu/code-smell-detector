function lookAt(te, eye, target, up) {
    const x = [0, 0, 0];
    const y = [0, 0, 0];
    const z = [0, 0, 0];
    subtract(z, eye, target);

    if (length(z) === 0) {

        // eye and target are in the same position

        z[2] = 1;

    }

    normalize(z, z);
    cross(x, up, z);

    if (length(z) === 0) {

        // up and z are parallel

        if (Math.abs(up[2]) === 1) {

            z[0] += 0.0001;

        } else {

            z[2] += 0.0001;

        }

        normalize(z, z);
        cross(x, up, z);

    }

    normalize(x, x);
    cross(y, z, x);

    te[ 0 ] = x[0]; te[ 4 ] = y[0]; te[ 8 ] = z[0];
    te[ 1 ] = x[1]; te[ 5 ] = y[1]; te[ 9 ] = z[1];
    te[ 2 ] = x[2]; te[ 6 ] = y[2]; te[ 10 ] = z[2];

    return te;
}
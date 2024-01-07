function setPosition(out, v) {
    const te = out;

    te[ 12 ] = v[0];
    te[ 13 ] = v[1];
    te[ 14 ] = v[2];

    return out;
}
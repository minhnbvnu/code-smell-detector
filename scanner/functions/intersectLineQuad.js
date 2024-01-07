function intersectLineQuad(p, q, corners) {
    _pq.sub2(q, p);
    _pa.sub2(corners[0], p);
    _pb.sub2(corners[1], p);
    _pc.sub2(corners[2], p);

    // Determine which triangle to test against by testing against diagonal first
    _m.cross(_pc, _pq);
    let v = _pa.dot(_m);
    let u;
    let w;

    if (v >= 0) {
        // Test intersection against triangle abc
        u = -_pb.dot(_m);
        if (u < 0)
            return -1;

        w = scalarTriple(_pq, _pb, _pa);
        if (w < 0)
            return -1;

        const denom = 1.0 / (u + v + w);

        _au.copy(corners[0]).mulScalar(u * denom);
        _bv.copy(corners[1]).mulScalar(v * denom);
        _cw.copy(corners[2]).mulScalar(w * denom);
        _ir.copy(_au).add(_bv).add(_cw);
    } else {
        // Test intersection against triangle dac
        _pd.sub2(corners[3], p);
        u = _pd.dot(_m);
        if (u < 0)
            return -1;

        w = scalarTriple(_pq, _pa, _pd);
        if (w < 0)
            return -1;

        v = -v;

        const denom = 1.0 / (u + v + w);

        _au.copy(corners[0]).mulScalar(u * denom);
        _bv.copy(corners[3]).mulScalar(v * denom);
        _cw.copy(corners[2]).mulScalar(w * denom);
        _ir.copy(_au).add(_bv).add(_cw);
    }

    // The algorithm above doesn't work if all the corners are the same
    // So do that test here by checking if the diagonals are 0 (since these are rectangles we're checking against)
    if (_pq.sub2(corners[0], corners[2]).lengthSq() < 0.0001 * 0.0001) return -1;
    if (_pq.sub2(corners[1], corners[3]).lengthSq() < 0.0001 * 0.0001) return -1;

    return _ir.sub(p).lengthSq();
}
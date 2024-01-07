function divGraphFrom2Curves(curve1, curve2, outUMax) {
    const sub = subGraph(curve2, curve1);
    maxUnsignedGraphValue(sub, outUMax);
    normalizeGraph(sub, outUMax);
    return sub;
}
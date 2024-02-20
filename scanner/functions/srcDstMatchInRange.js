function srcDstMatchInRange(rangeLen, srcPredicate, dstPredicate, measured) {
    let [src1, src2] = firstLastMatchInRange(rangeLen, srcPredicate);
    let [dst1, dst2] = firstLastMatchInRange(rangeLen, dstPredicate);
    if (dst1 === undefined || src1 === undefined) {
        return undefined;
    }
    return {
        first: Math.min(src1, dst1),
        last: Math.max(src2, dst2),
        measured: measured
    };
}
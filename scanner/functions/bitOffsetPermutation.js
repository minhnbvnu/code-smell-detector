function bitOffsetPermutation(time, factor, span, state) {
    let offset = Math.floor(time*span) * factor;
    return makeCycleBitsPermutation(offset, span)(state)
}
function lhToRem(val, lineHeight) {
    return parseFloat((lineHeight * val).toFixed(3)) + 'rem'
}
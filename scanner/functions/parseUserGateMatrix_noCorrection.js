function parseUserGateMatrix_noCorrection(text) {
    // If brackets are present, use the normal parse method that enforces grouping.
    if (text.match(/[\{}\[\]]/)) {
        return Matrix.parse(text.split(/[\{\[]/).join('{').split(/[}\]]/).join('}'));
    }

    // Newlines introduce a break if one isn't already present at that location and we aren't at the end.
    text = text.split(/,?\s*\n\s*(?!$)/).join(',');
    text = text.trim();
    // Ignore trailing comma.
    if (text.endsWith(',')) {
        text = text.substring(0, text.length - 1);
    }

    let parts = text.split(',').map(e => e === '' ? 0 : Complex.parse(e));

    // Expand singleton cell into a 2x2 global phase operation.
    if (parts.length === 1) {
        parts.push(0, 0, parts[0]);
    }

    // Pad with zeroes up to next size that makes sense.
    let n = Math.max(4, 1 << (2*Math.max(1, Util.floorLg2(Math.sqrt(parts.length)))));
    if (n < parts.length) {
        n <<= 2;
    }
    if (n > (1<<8)) {
        throw Error("Max custom matrix operation size is 4 qubits.")
    }
    //noinspection JSCheckFunctionSignatures
    return Matrix.square(...parts, ...new Array(n - parts.length).fill(0));
}
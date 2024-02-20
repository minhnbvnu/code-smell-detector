function getValidatorSignature() {
    return Buffer.from(
        '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef' +
        '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef' +
        '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
    'hex');
}
function getValidatorPubkey() {
    let index = ++pubkeyIndex;
    return Buffer.from(index.toString(16).padStart(96, '0'), 'hex');
}
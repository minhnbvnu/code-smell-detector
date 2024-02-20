async function createMinipool(txOptions, salt = null) {
    return createMinipoolWithBondAmount(txOptions.value, txOptions, salt);
}
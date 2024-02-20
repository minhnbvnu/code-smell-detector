function getDepositDataRoot(depositData) {
    return types.DepositData.hashTreeRoot(depositData);
}
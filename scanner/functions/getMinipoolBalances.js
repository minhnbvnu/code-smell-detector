function getMinipoolBalances() {
        return Promise.all([
            minipool.getNodeDepositBalance.call(),
            minipool.getNodeRefundBalance.call(),
            minipool.getUserDepositBalance.call(),
        ]).then(
          ([nodeDepositBalance, nodeRefundBalance, userDepositBalance]) =>
            ({nodeDepositBalance, nodeRefundBalance, userDepositBalance})
        );
    }
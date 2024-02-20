async function refundMinipoolNodeETH(minipool, txOptions) {
    await minipool.refund(txOptions);
}
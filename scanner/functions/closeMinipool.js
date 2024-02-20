async function closeMinipool(minipool, txOptions) {
    await minipool.close(txOptions);
}
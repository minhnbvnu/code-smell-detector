async function dissolveMinipool(minipool, txOptions) {
    await minipool.dissolve(txOptions);
}
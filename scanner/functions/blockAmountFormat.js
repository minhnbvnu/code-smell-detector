function blockAmountFormat(blocks) {
    return `${blocks} (${approxTimeDifference(blocks * Nimiq.Policy.BLOCK_TIME)})`;
}
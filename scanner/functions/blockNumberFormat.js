function blockNumberFormat(blockNumber, head) {
    if (!head) return blockNumber.toString();
    if (blockNumber === head.number) return `${blockNumber} (Now)`;
    const targetTimestamp = head.timestamp - (head.number - blockNumber) * Nimiq.Policy.BLOCK_TIME;
    const diff = targetTimestamp - Date.now() / 1000;
    return `${blockNumber} (${diff > 0 ? 'in ' : ''}${approxTimeDifference((head.number - blockNumber) * Nimiq.Policy.BLOCK_TIME, true)}${diff < 0 ? ' ago' : ''})`;
}
function approxTimeDifference(diff, withA) {
    diff = Math.abs(diff);
    if (diff < 600) return `${withA ? 'a ' : ''}few minutes`;
    if (diff < 3600) return `${Math.round(diff / 300) * 5} minutes`;
    if (diff < 60 * 60 * 48) return `${Math.round(diff / 3600)} hours`;
    if (diff < 60 * 60 * 24 * 90) return `${Math.round(diff / 86400)} days`;
    if (diff < 60 * 60 * 24 * 600) return `${Math.round(diff / 2592000)} months`;
    return `${Math.round(diff / 32536000)} years`;
}
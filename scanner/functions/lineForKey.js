function lineForKey(summary, key) {
    const metrics = summary[key];

    key = key.substring(0, 1).toUpperCase() + key.substring(1);
    if (key.length < 12) {
        key += '                   '.substring(0, 12 - key.length);
    }
    const result = [
        key,
        ':',
        metrics.pct + '%',
        '(',
        metrics.covered + '/' + metrics.total,
        ')'
    ].join(' ');
    const skipped = metrics.skipped;
    if (skipped > 0) {
        return result + ', ' + skipped + ' ignored';
    }
    return result;
}
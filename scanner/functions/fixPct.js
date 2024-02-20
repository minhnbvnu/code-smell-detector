function fixPct(metrics) {
    Object.keys(emptyClasses).forEach(key => {
        metrics[key].pct = 0;
    });
    return metrics;
}
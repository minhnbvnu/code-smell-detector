function isFull(metrics) {
    return (
        metrics.statements.pct === 100 &&
        metrics.branches.pct === 100 &&
        metrics.functions.pct === 100 &&
        metrics.lines.pct === 100
    );
}
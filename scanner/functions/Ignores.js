function Ignores({ metrics, metricsToShow }) {
    const metricKeys = Object.keys(metricsToShow);
    const result = [];

    for (let i = 0; i < metricKeys.length; i++) {
        const metricKey = metricKeys[i];
        if (metricsToShow[metricKey]) {
            const skipped = metrics[metricKey].skipped;
            if (skipped > 0) {
                result.push(
                    `${skipped} ${metricKey}${
                        skipped === 1 ? '' : metricKey === 'branch' ? 'es' : 's'
                    }`
                );
            }
        }
    }

    if (result.length === 0) {
        return false;
    }

    return (
        <div className="toolbar__item">
            <span className="strong">{result.join(', ')}</span>
            <span className="quiet">Ignored</span>
        </div>
    );
}
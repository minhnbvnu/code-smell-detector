function getWorstMetricClassForPercent(metricsToShow, metrics) {
    let classForPercent = 'none';
    for (const metricToShow in metricsToShow) {
        if (metricsToShow[metricToShow]) {
            const metricClassForPercent = metrics[metricToShow].classForPercent;

            // ignore none metrics so they don't change whats shown
            if (metricClassForPercent === 'none') {
                continue;
            }

            // if the metric low or lower than whats currently being used, replace it
            if (
                metricClassForPercent == 'low' ||
                (metricClassForPercent === 'medium' &&
                    classForPercent !== 'low') ||
                (metricClassForPercent === 'high' &&
                    classForPercent !== 'low' &&
                    classForPercent !== 'medium')
            ) {
                classForPercent = metricClassForPercent;
            }
        }
    }
    return classForPercent;
}
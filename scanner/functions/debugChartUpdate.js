function debugChartUpdate(updateDuration) {
        const displayed = chartDivContainer.style.display != 'none';
        charts.forEach(c => c.update(displayed, updateDuration));
    }
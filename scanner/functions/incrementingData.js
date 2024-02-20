function incrementingData() {
    var series = [];
    var labels = [];
    for (var x = 0; x < 50; x++) {
        if (x % 2 === 0) {
            continue;
        }
        labels.push('Label ' + x);
        series.push(Functions.random(x, x + 10));
    }
    return {
        series: series,
        labels: labels
    }
}
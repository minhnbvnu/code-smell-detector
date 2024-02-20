function decrementingData() {
    var series = [];
    var labels = [];
    for (var x = 50; x > 0; x--) {
        if (x % 2 === 0) {
            continue;
        }
        labels.push('Label ' + x);
        series.push(Functions.random(x + 10, x));
    }
    return {
        series: series,
        labels: labels
    }
}
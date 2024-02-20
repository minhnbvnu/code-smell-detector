function randomData() {
    var series = [];
    var labels = [];
    for (var x = 0; x < 30; x++) {
        labels.push('Label ' + x);
        series.push(Functions.random(20, 80));
    }
    return {
        series: series,
        labels: labels
    }
}
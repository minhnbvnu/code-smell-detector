function animatedPeityArea(element, height, color) {
    var chart = $(element).peity('line', {
        height: height,
        width: '100%',
        fill: color,
        stroke: color
    });
    setInterval(function() {
        var random = Math.floor(Math.random() * 10) + 2;
        var values = chart.text().split(',');
        values.shift();
        values.push(random);
        chart.text(values.join(',')).change();
    }, 1000);
}
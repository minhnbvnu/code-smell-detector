function delay_color(mins) {
    var min = parseInt(mins);
    if (min <= -15) return 'green';
    else if (min <= 0) return 'green';
    else if (min <= 15) return 'orange';
    else return 'red';
}
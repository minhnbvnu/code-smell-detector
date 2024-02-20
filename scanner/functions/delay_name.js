function delay_name(mins) {
    var min = parseInt(mins);
    if (min <= 0) return 'On-Time';
    else return 'Delayed';
}
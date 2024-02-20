function diffDay(a, b) {
    return moment.duration({
        days: a.clone().stripTime().diff(b.clone().stripTime(), 'days')
    });
}
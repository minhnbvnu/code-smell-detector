function getUTCNow(utcoffset) {
    return moment().add(parseInt(utcoffset), "hours").toDate();
}
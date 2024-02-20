function whenRestTimeEndAfter(val) {
    if (val === 0)
        store.set('no-check-rest-time-end', false);
    else
        store.set('no-check-rest-time-end', true);
}
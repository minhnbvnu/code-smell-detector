function whenWorkTimeEndAfter(val) {
    if (val === 0)
        store.set('no-check-work-time-end', false);
    else
        store.set('no-check-work-time-end', true);
}
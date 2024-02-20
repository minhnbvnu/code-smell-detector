function startFromWhichDayAfter(val) {
    if (val === 0) store.set('start-from-monday', true);
    else store.set('start-from-monday', false);
}
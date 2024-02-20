function disablePauseAfter(val) {
    switch (val) {
        case 0:
            store.set('disable-pausing', true);
            store.set('disable-pausing-special', 'all');
            break;
        case 1:
            store.set('disable-pausing', true);
            store.set('disable-pausing-special', 'work');
            break;
        case 2:
            store.set('disable-pausing', true);
            store.set('disable-pausing-special', 'rest');
            break;
        case 3:
            store.set('disable-pausing', false);
            break;
    }
}
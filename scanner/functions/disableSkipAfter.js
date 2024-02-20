function disableSkipAfter(val) {
    switch (val) {
        case 0:
            store.set('disable-skipping', true);
            store.set('disable-skipping-special', 'all');
            break;
        case 1:
            store.set('disable-skipping', true);
            store.set('disable-skipping-special', 'work');
            break;
        case 2:
            store.set('disable-skipping', true);
            store.set('disable-skipping-special', 'rest');
            break;
        case 3:
            store.set('disable-skipping', false);
            break;
    }
}
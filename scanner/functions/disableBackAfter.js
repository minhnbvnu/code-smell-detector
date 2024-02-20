function disableBackAfter(val) {
    switch (val) {
        case 0:
            store.set('disable-backing', true);
            store.set('disable-backing-special', 'all');
            break;
        case 1:
            store.set('disable-backing', true);
            store.set('disable-backing-special', 'work');
            break;
        case 2:
            store.set('disable-backing', true);
            store.set('disable-backing-special', 'rest');
            break;
        case 3:
            store.set('disable-backing', false);
            break;
    }
}
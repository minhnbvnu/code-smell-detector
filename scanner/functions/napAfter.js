function napAfter(val) {
    switch (val) {
        case 0:
            store.set('nap', false);
            break;
        case 1:
            store.set('nap', true);
            store.set('nap-time', 10);
            break;
        case 2:
            store.set('nap', true);
            store.set('nap-time', 15);
            break;
        case 3:
            store.set('nap', true);
            store.set('nap-time', 20);
    }
}
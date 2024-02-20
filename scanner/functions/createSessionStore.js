function createSessionStore(key) {
    key = key.toUpperCase();
    key = "PLENTI_CMS_" + key;
    
    let value = sessionStorage.getItem(key);
    if (value)
        value = JSON.parse(value);
    else
        value = null;

    const store = writable(value);
    store.subscribe(value => {
        sessionStorage.setItem(key, JSON.stringify(value));
    });

    return store;
}
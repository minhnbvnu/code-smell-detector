function save_local(key, value) {
    if (arguments.length === 0) {
        $setLocalStorage('GAME_STATE_' + $gameURL, '{}');
        return;
    }

    if (typeof key === 'object') {
        for (let k in key) {
            save_local(k, key[k]);
        }
        return;
    }
    
    let table = $getLocalStorage('GAME_STATE_' + $gameURL);
    
    if (table) {
        table = JSON.parse(table);
    } else {
        table = {};
    }

    if (value === undefined) {
        delete table[key];
    } else {
        const v = unparse(value, 0);
        if (v.length > 4096) {
            $error('Cannot store_local() a value that is greater than 4096 characters after unparse()');
        }
        table[key] = v;
        if ($Object.keys(table).length > 64) {
            $error('Cannot store_local() more than 64 separate keys.');
        }
    }

    $setLocalStorage('GAME_STATE_' + $gameURL, JSON.stringify(table));
}
function load_local(key, default_value) {
    let table = $window.localStorage.getItem('GAME_STATE_' + $gameURL);
    if (! table) { return default_value; }
    
    table = JSON.parse(table);

    if (arguments.length === 0) {
        // Return everything
        for (let key in table) {
            table[key] = parse(table[key]);
        }
        return table;
    } else {
        const value = table[key];
        if (value) {
            return parse(value);
        } else {
            return default_value;
        }
    }
}
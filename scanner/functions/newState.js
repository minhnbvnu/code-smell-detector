function newState(name, state) {
        if (name in exports.STATE) {
            throw Error('State ' + name + ' already exists');
        }
        exports.STATE[name] = state;
    }
function singletonify(inst) {
        [
            ...Object.keys(inst),
            ...Object.getOwnPropertyNames(inst.constructor.prototype),
        ].forEach(key => {
            if (key === 'argv') {
                defineGetter(Argv, key, lookupGetter(inst, key));
            }
            else if (typeof inst[key] === 'function') {
                Argv[key] = inst[key].bind(inst);
            }
            else {
                defineGetter(Argv, '$0', () => inst.$0);
                defineGetter(Argv, 'parsed', () => inst.parsed);
            }
        });
    }
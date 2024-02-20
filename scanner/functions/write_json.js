function write_json(path, json) {
            (0, sys_1.write)(path, JSON.stringify(json, undefined, 2));
            print(`Wrote ${cyan(path)}`);
        }
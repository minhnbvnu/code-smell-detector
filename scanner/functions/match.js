function match(str, expected, msg) {
        const name = msg || `'${str}'`
        t.deepEqual(parse(str), expected, `${name} matches`)
    }
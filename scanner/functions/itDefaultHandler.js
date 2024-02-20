function itDefaultHandler(text, method) {
        try {
            return method.call(this);
        }
        catch (err) {
            if (err instanceof assert.AssertionError) {
                err.message += ` (${util.inspect(err.actual)} ${err.operator} ${util.inspect(err.expected)})`;
            }
            throw err;
        }
    }
function noErrors(factory, message, _id, expr) {
        var mtext = factory.create('token', 'mtext', {}, expr.replace(/\n/g, ' '));
        var error = factory.create('node', 'merror', [mtext], { 'data-mjx-error': message, title: message });
        return error;
    }
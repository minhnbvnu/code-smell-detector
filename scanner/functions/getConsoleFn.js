function getConsoleFn(level) {
    var args = ['console'];

    if (level) {
        args.push(level);
    }

    return function () {
        var args = (level ? [level] : []).
            concat(Array.prototype.slice.apply(arguments));
        emit('console', args.join(' '));
    };
}
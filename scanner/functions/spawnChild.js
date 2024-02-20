function spawnChild(options) {
    options = _.defaults(options || {}, defaultOptions);
    var args = [ options.script ];

    for (var k in options) {
        if (k !== 'script') {
            args.push('--' + k + '=' + options[k]);
        }
    }

    var child = spawn(options.command, args);
    child.stdout.setEncoding('utf8');

    child._stdout = child.stdout;
    child.stdout = carrier.carry(child.stdout);

    return child;
}
function processDefaultArgSyntax(args) {
    // Nothing to parse
    if (! /\bdefault\b/.test(args)) { return args; }

    const match = {'(':')', '[':']', '{':'}'};

    let accum = '';
    let i = 0;
    let first = true;
    while (i !== -1) {
        // Find the next interesting symbol or character. The first time
        // through, we stop at 'default'. Thereafter, we only stop for
        // commas or parens.
        i = args.search(first ? /[,\(\[\{]| default / : /[,\(\[\{]/);
        first = false;
        if (i === -1) {
            // Nothing to do, break
        } else if (args[i] === ',' || args[i] === ' ') {
            if (args[i] === ',') {
                do { ++i; } while (i < args.length && args[i] === ' ');
                // Skip over the argument
                do { ++i; } while (i < args.length && ! /[ ,\)]/.test(args[i]));
            }

            // And any space after the argument
            while (i < args.length && args[i] === ' ') { ++i; };

            // Move all of this to accum
            accum += args.substring(0, i); args = args.substring(i);

            // See if there's a 'default', and convert it if so
            if (args.startsWith('default ')) {
                accum += '= ';
                args = args.substring('default '.length);
            }
        } else {
            // Skip to the matching paren
            i = findMatchingParen(args, i, +1, args[i], match[args[i]]);
            accum += args.substring(0, i); args = args.substring(i);
        }
    }
    // No more, we're done
    return accum + args;
}
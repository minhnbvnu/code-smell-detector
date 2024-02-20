function RegExp (
    pattern,
    flags
)
{
    // Try to find a cached regexp object for these arguments
    var flagsMap = reCache.get(pattern);
    if (flagsMap !== undefined)
    {
        var cached = flagsMap.get(flags);
        if (cached !== undefined)
            return cached;
    }

    if (pattern instanceof RegExp)
        return pattern;

    if (!(this instanceof RegExp))
        return new RegExp(pattern, flags);

    this.source = (pattern === undefined ? "" : pattern);
    this.global = false;
    this.ignoreCase = false;
    this.multiline = false;
    this.lastIndex = 0;

    // Extract flags
    if (flags !== undefined)
    {
        for (var i = 0; i < flags.length; ++i)
        {
            if (flags.charCodeAt(i) === 103) // 'g'
            {
                this.global = true;
            }
            else if (flags.charCodeAt(i) === 105) // 'i'
            {
                this.ignoreCase = true;
            }
            else if (flags.charCodeAt(i) === 109) // 'm'
            {
                this.multiline = true;
            }
        }
    }

    // Parse pattern and compile it to an automata
    var ast = new RegExpParser().parse(pattern);

    var prop = {
        value: astToAutomata(ast, this.global, this.ignoreCase, this.multiline),
        writable: false,
        configurable: false,
        enumerable: false
    };

    Object.defineProperty(this, "_automata", prop);

    // Cache the parsed regular expression object
    var flagsMap = reCache.get(pattern);
    if (flagsMap === undefined)
    {
        flagsMap = new Map();
        reCache.set(pattern, flagsMap);
    }
    flagsMap.set(flags, this);
}
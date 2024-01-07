function extendSymbol(symbol) {
    let sources = Array.prototype.slice.call(arguments, 1);
    if (!sources || !sources.length) {
        sources = [{}];
    }
    if (Array.isArray(symbol)) {
        let s, dest;
        const result = [];
        for (let i = 0, l = symbol.length; i < l; i++) {
            s = symbol[i];
            dest = {};
            for (let ii = 0, ll = sources.length; ii < ll; ii++) {
                if (!Array.isArray(sources[ii])) {
                    extend(dest, s, sources[ii] ? sources[ii] : {});
                } else if (!isNil(sources[ii][i])) {
                    extend(dest, s, sources[ii][i]);
                } else {
                    extend(dest, s ? s : {});
                }
            }
            result.push(dest);
        }
        return result;
    } else {
        const args = [{}, symbol];
        args.push.apply(args, sources);
        return extend.apply(this, args);
    }
}
function ultimate(s) {
        var x = symbol(s, 0);
        x.from = 1;
        x.thru = 1;
        x.line = 0;
        x.edge = 'edge';
        s.string = s;
        return postscript(x);
    }
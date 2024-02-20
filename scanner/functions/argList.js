function argList(s) {
    return s.match(/^\w+\((.*)\)$/)[1].match(/(\w+)/g);
}
function parseConstraintHash(constraint, ret, identifiers) {
    if (constraint.length && extd.isHash(constraint[0])) {
        //ret of options
        var refs = constraint.shift();
        extd(refs).values().forEach(function (ident) {
            if (indexOf(identifiers, ident) === -1) {
                identifiers.push(ident);
            }
        });
        ret.push(',' + extd.format('%j', [refs]));
    }
}
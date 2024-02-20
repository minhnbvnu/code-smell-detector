function constraintsToJs(constraint, identifiers) {
    constraint = constraint.slice(0);
    var ret = [];
    if (constraint[0] === "or") {
        ret.push('["' + constraint.shift() + '"');
        ret.push(extd.map(constraint,function (c) {
            return constraintsToJs(c, identifiers);
        }).join(",") + "]");
        return ret;
    } else if (constraint[0] === "not" || constraint[0] === "exists") {
        ret.push('"', constraint.shift(), '", ');
    }
    identifiers.push(constraint[1]);
    ret.push(constraint[0], ', "' + constraint[1].replace(/\\/g, "\\\\").replace(/"/g, "\\\"") + '"');
    constraint.splice(0, 2);
    if (constraint.length) {
        //constraint
        var c = constraint.shift();
        if (extd.isString(c) && c) {
            ret.push(',"' + c.replace(/\\/g, "\\\\").replace(/"/g, "\\\""), '"');
            forEach(constraintMatcher.getIdentifiers(parser.parseConstraint(c)), function (i) {
                identifiers.push(i);
            });
        } else {
            ret.push(',"true"');
            constraint.unshift(c);
        }
    }
    parseConstraintModifier(constraint, ret);
    parseConstraintHash(constraint, ret, identifiers);
    return '[' + ret.join("") + ']';
}
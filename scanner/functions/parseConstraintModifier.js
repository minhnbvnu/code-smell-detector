function parseConstraintModifier(constraint, ret) {
    if (constraint.length && extd.isString(constraint[0])) {
        var modifier = constraint[0].match(" *(from)");
        if (modifier) {
            modifier = modifier[0];
            switch (modifier) {
            case "from":
                ret.push(', "', constraint.shift(), '"');
                break;
            default:
                throw new Error("Unrecognized modifier " + modifier);
            }
        }
    }
}
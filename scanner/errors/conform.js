function conform(one, two) {

// The conform function takes a type string and a token, or two tokens.

        var one_type = typeof one === 'string' ? one : one.type,
            two_type = two.type,
            two_thing;

// If both tokens already have a type, and if they match, then we are done.
// Once a token has a type, it is locked. Neither token will change, but if
// they do not match, there will be a warning.

        if (one_type) {
            if (two_type) {
                match_type(one_type, two_type, one, two);
            } else {

// two does not have a type, so look deeper. If two is a variable or property,
// then use its type if it has one, and make the deep type one's type if it
// doesn't. If the type was *, or if there was a mismatch, don't change the
// deep type.

                two_thing = two.id === '(identifier)' ? scope[two.string] :
                    two.id === '.' ? property_type[two.second.string] : null;
                if (two_thing) {
                    two_type = two_thing.type;
                    if (two_type) {
                        if (two_type !== '*') {
                            if (!match_type(one_type, two_type, one, two)) {
                                return '';
                            }
                        }
                    } else {
                        two_thing.type = one_type;
                    }
                }

// In any case, we give two a type.

                two.type = one_type;
                type_state_change = true;
                return one_type;
            }

// one does not have a type, but two does, so do the old switcheroo.

        } else {
            if (two_type) {
                return conform(two, one);

// Neither token has a type yet. So we have to look deeper to see if either
// is a variable or property.

            } else {
                if (one.id === '(identifier)') {
                    one_type = scope[one.string].type;
                    if (one_type && one_type !== '*') {
                        one.type = one_type;
                        return conform(one, two);
                    }
                } else if (one.id === '.') {
                    one_type = property_type[one.second.string];
                    if (one_type && one_type !== '*') {
                        one.type = scope[one.string].type;
                        return conform(one, two);
                    }
                }
                if (two.id === '(identifier)') {
                    two_type = scope[two.string].type;
                    if (two_type && two_type !== '*') {
                        two.type = two_type;
                        return conform(two, one);
                    }
                } else if (two.id === '.') {
                    two_type = property_type[two.second.string];
                    if (two_type && two_type !== '*') {
                        two.type = scope[two.string].type;
                        return conform(two, one);
                    }
                }
            }
        }

// Return a falsy string if we were unable to determine the type of either token.

        return '';
    }
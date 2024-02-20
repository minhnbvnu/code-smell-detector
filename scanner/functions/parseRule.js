function parseRule(rule, conditions, identifiers, defined, name) {
        if (rule.length) {
            var r0 = rule[0];
            if (r0 === "not" || r0 === "exists") {
                var temp = [];
                rule.shift();
                __resolveRule(rule, identifiers, temp, defined, name);
                var cond = temp[0];
                cond.unshift(r0);
                conditions.push(cond);
            } else if (r0 === "or") {
                var conds = [r0];
                rule.shift();
                forEach(rule, function (cond) {
                    parseRule(cond, conds, identifiers, defined, name);
                });
                conditions.push(conds);
            } else {
                __resolveRule(rule, identifiers, conditions, defined, name);
                identifiers = removeDuplicates(identifiers);
            }
        }

    }
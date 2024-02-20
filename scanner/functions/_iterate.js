function _iterate(resource, statement, context, source, keep) {
    var i, j;
    resource = jsonfill.unwrap(resource);

    // Local filtering (rudimentary)
    // Prep expected once
    var expecteds = _.map(statement.whereCriteria, function (cond) {
        var expected = [];
        if(cond.operator === 'in') {
            _.each(cond.rhs.value, function (val) {
                expected = expected.concat(jsonfill.fill(val, context));
            });
        }
        else if(cond.operator === '=') {
            expected = expected.concat(jsonfill.fill(cond.rhs.value, context));
        }
        else if(cond.operator !== 'udf') {
            assert.ok(cond.operator === '=', 'Local filtering supported for = only');
        }
        return expected;
    });

    // Initially, everything is a match. We then iteratively reduce the set.
    var filtered = [];
    // All and conditions should match. If the RHS of a condition
    // has multiple values, they are ORed.
    //
    if(statement.whereCriteria && statement.whereCriteria.length > 0) {
        // Wrap into an array if source is not an array. Otherwise we will end up
        // iterating over its props
        filtered = _.isArray(resource) ? resource : [resource];

        var matched = [];
        for(i = 0; i < filtered.length; i++) {
            matched.push(i);
        }

        for(i = 0; i < statement.whereCriteria.length; i++) {
            var cond = statement.whereCriteria[i];
            if(cond.operator && cond.operator === 'udf') {
                // Don't process UDFs yet
                continue;
            }
            var expected = expecteds[i];
            var path = cond.lhs.name;
            if(path.indexOf(source.alias + '.') === 0) {
                path = path.substr(source.alias.length + 1);
            }

            var _matched = [];
            for(var k = 0; k < matched.length; k++) {
                var match = false;
                var row = filtered[matched[k]];
                var result = jsonPath.eval(row, path, {flatten: true, sandbox: context});
                // If the result matches any expected[], keep it.
                for(j = 0; j < expected.length; j++) {
                    if(!match && result) {
                        if(_.isArray(result)) {
                            for(var v in result) {
                                if(_.isArray(expected[j])) {
                                    for(var vv in expected[j]) {
                                        if(result[v] == expected[j][vv]) {
                                            match = true;
                                            break;
                                        }
                                    }
                                }
                                else {
                                    if(result[v] == expected[j]) {
                                        match = true;
                                        break;
                                    }
                                }
                            }
                        }
                        else {
                            if(_.isArray(expected[j])) {
                                for(var vv in expected[j]) {
                                    if(result[v] == expected[j][vv]) {
                                        match = true;
                                        break;
                                    }
                                }
                            }
                            else {
                                if(result == expected[j]) {
                                    match = true;
                                    break;
                                }
                            }
                        }
                    }
                }
                if(match) {
                    _matched.push(k);
                }
            }
            matched = _matched;
        }
        var ret = [];
        for(i = 0; i < filtered.length; i++) {
            if(keep && _.contains(matched, i)) {
                ret.push(resource[i]);
            }
            else if (!keep && !_.contains(matched, i)) {
                ret.push(resource[i]);
            }
        }
        filtered = ret;
    }
    else {
        // If there are no where conditions, use the original
        filtered = keep ? resource : [];
    }
    return filtered;
}
function introspectString(v, symbols, dependsOn, line) {
    try {
        var parsed = strParser.parse(v);
        _.each(parsed.vars, function(refname) {
            var index = refname.indexOf('.');
            if(index > 0) {
                refname = refname.substring(0, index);
            }
            var dependency = symbols[refname];
            if(dependency) {
                var contains = false;
                for(var i = 0; i < dependsOn.length; i++) {
                    contains = _.isEqual(dependsOn[i], dependency);
                    if(contains) {
                        break;
                    }
                }
                if(!contains) {
                    addDep(line, dependsOn, dependency, symbols);
                }
            }
        });
    }
    catch(e) {
        // Ignore
    }
}
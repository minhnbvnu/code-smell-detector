function introspectFrom(line, froms, symbols, parent) {
    var j, from, refname, dependency;
    for(j = 0; j < froms.length; j++) {
        from = froms[j];
        if(from.name.indexOf('{') === 0) {
            refname = from.name.substring(1, from.name.length - 1);

        }
        else if(symbols[from.name]) {
            refname = from.name
        }
        dependency = symbols[refname];
        if(dependency) {
            if(line.assign === refname) {
                throw new this.SyntaxError('Circular reference ' + line.assign);
            }
            else {
                if(parent) {
                    addDep(parent, parent.dependsOn, dependency, symbols);
                }
                else {
                    addDep(line, line.dependsOn, dependency, symbols);
                }
            }
            var hasverb = dependency[line.type];
            if(hasverb && hasverb.expect){
                line.expects = hasverb.expect;

            }
        }else{
            if(cache['_tables'] && cache['_tables'][from.name] && cache['_tables'][from.name].verbs && cache['_tables'][from.name].verbs[line.type] && cache['_tables'][from.name].verbs[line.type].expects){
                line.expects = cache['_tables'][from.name].verbs[line.type].expects;
            }
        }
    }
}
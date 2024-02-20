function introspectWhere(line, symbols, parent) {
    var j, where, k, ref, refname, index, dependency;
    line.dependsOn = line.dependsOn || [];
    if(line.whereCriteria) {
        for(j = 0; j < line.whereCriteria.length; j++) {
            where = line.whereCriteria[j];
            switch(where.operator) {
                case 'in' :
                    if(_.isArray(where.rhs.value)) {
                        for(k = 0; k < where.rhs.value.length; k++) {
                            ref = where.rhs.value[k];
                            if(_.isString(ref) && ref.indexOf('{') === 0) {
                                if(ref.indexOf('{^') == 0) {
                                    refname = ref.substring(2, ref.length - 1);
                                    var to = parent || line;
                                    to.preRequisites = to.preRequisites || [];
                                 	to.preRequisites.push(refname);
                                 	where.rhs.value[k] = where.rhs.value[k].replace('{^','{');
                                }
                                else {
                                    refname = ref.substring(1, ref.length - 1);
                                }
                                index = refname.indexOf('.');
                                if(index > 0) {
                                    refname = refname.substring(0, index);
                                }
                                dependency = symbols[refname];
                                if(line.assign === refname) {
                                    throw new this.SyntaxError('Circular reference ' + line.assign);
                                }
                                else if(dependency) {
                                    addDep(line, line.dependsOn, dependency, symbols);
                                }
                            }
                        }
                    }
                    else if(where.rhs.type === 'select') {
                        introspectFrom(where.rhs, where.rhs.fromClause, symbols, line);
                        introspectWhere(where.rhs, symbols, parent || line);
                    }
                    break;
                case '=' :
                    ref = where.rhs.value;
                    if(_.isString(ref) && ref.indexOf('{') === 0) {
                        if(ref.indexOf('{^') == 0) {
                            refname = ref.substring(2, ref.length - 1);
                            var to = parent || line;
                            to.preRequisites = to.preRequisites || [];
                         	to.preRequisites.push(refname);
                         	where.rhs.value = where.rhs.value.replace('{^','{');
                        }
                        else {
                            refname = ref.substring(1, ref.length - 1);
                        }
                        index = refname.indexOf('.');
                        if(index > 0) {
                            refname = refname.substring(0, index);
                        }
                        dependency = symbols[refname];
                        if(dependency) {
                            if(line.assign === refname) {
                                throw new this.SyntaxError('Circular reference ' + line.assign);
                            }
                            else {
                                addDep(parent || line, (parent || line).dependsOn, dependency, symbols);
                            }
                        }
                    }
                    break;
                case 'udf':
                    refname = where.name;
                    index = refname.indexOf('.');
                    if(index > 0) {
                        refname = refname.substring(0, index);
                    }
                    dependency = symbols[refname];
                    if(dependency) {
                        if(line.assign === refname) {
                            throw new this.SyntaxError('Circular reference ' + line.assign);
                        }
                        else {
                            addDep(line, line.dependsOn, dependency, symbols);
                        }
                    }
                    else {
                        throw new this.SyntaxError('UDF ' + where.name + ' not resolved')
                    }
                    break;
            }
        }
    }
    return line;
}
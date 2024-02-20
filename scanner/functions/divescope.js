function divescope(lines, scope) {
        if (!lines){
            return;
        }
        var i, line;
        for (i = 0; i < lines.length; i++) {
            line = lines[i];
            maxid = line.id > maxid ? line.id : maxid;
            if(scope){
                line.scope = scope;
            }
            if(line.assign) {
                if(symbols[line.assign]) {
                    throw new this.SyntaxError('Duplicate symbol ' + line.assign);
                }
                else {
                    symbols[line.assign] = line;
                }
            }
            else if(line.type === 'create') { // Makes sense when DDL is inline
                symbols[line.name] = line;
                creates[line.id.toString()] = line;
            }
            else if (line.type === 'if') {
                divescope(line.if, line);
                divescope(line.else, line);
            }
            else if (line.type === 'try') {
                //dependsOn are the lines in try clause
                divescope(line.dependsOn, line);
                _.each(line.catchClause, function(mycatch, k){
                    divescope(mycatch.lines, line);
                });
                if(line.finallyClause) {
                    divescope(line.finallyClause, line);
                }
            }
        }
    }
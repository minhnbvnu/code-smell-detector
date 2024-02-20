function plan(compiled) {
    // Collect all assignments
    var symbols = {}, i, line;
    var ret, single, count = 0;
    var comments = [];
    var creates = {};
    var maxid = 0;
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
    for(i = 0; i < compiled.length; i++) {
        line = compiled[i];
        maxid = line.id > maxid ? line.id : maxid;
        // Collect the statements and assign them to the following non-comment.
        if(line.type === 'comment') {
            comments.push(line);
            continue;
        }

        if(comments.length > 0) {
            // Assign comments now.
            line.comments = comments;
            comments = [];
        }

        if(line.assign) {
            if(symbols[line.assign]) {
                throw new this.SyntaxError('Duplicate symbol ' + line.assign);
            }
            else {
                symbols[line.assign] = line;
            }
            single = line;
        }
        else if(line.type === 'create') { // Makes sense when DDL is inline
            symbols[line.name] = line;
            creates[line.id.toString()] = line;
        }
        else if (line.type === 'if') {
            divescope(line.if, line);
            if (line.else){
                divescope(line.else, line);
            }
            single = line;
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
            single = line;
        }
        else {
            single = line;
        }
        if(line.type !== 'comment' && line.type !== 'create' && line.type !== 'return') {
            count++;
        }
        if(line.type === 'return') {
            ret = line;
        }
    }
    if(!ret) {
        if(single) {
            // Make up a return statement so that there is always a return statement
            // when there is an executable statement in the script
            ret = {
                type: 'return',
                line: single.line,
                id: maxid + 1,
                rhs: single
            }
        }
        else {
            // If there is no executable script, just return the compiled statements as they are.
            ret = {
                type: 'return',
                line: 1,
                id: maxid + 1,
                rhs: {
                    object: {},
                    type: 'define',
                    line: 1
                },
                comments: comments
            };
        }
    }

    // Start with the return statement and create the plan.
    _.each(compiled, function(line) {
        walk(line, symbols);
    });
    walk(ret, symbols);

    // Reverse links from dependencies and pickup orphans
    var used = [];
    function rev(node) {
        _.each(node.dependsOn, function(dependency) {
            used.push(dependency.id);
            rev(dependency);
        });
        if(node.fallback) {
            used.push(node.fallback.id);
            rev(node.fallback);
            node.fallback.listeners = node.listeners;
            node.fallback.fbhold = true;
        }
        if(node.scope) {
            used.push(node.scope.id);
        }
    }
    used.push(ret.rhs.id);
    rev(ret.rhs);
    _.each(compiled, function(line) {
        rev(line);
    });
    used.push(ret.id);

    // Insert all orphans at the beginning of dep arr. Orphans occur when dependencies are based on
    // body templates but the language has no way of knowing such dependencies.
    // Orphans include create table statements.
    var orphans = [];
    creates = [];
    _.each(compiled, function(line) {
        if(line.type !== 'comment' && line.type !== 'return' && used.indexOf(line.id) === -1) {
            if(line.type === 'create') {
                creates.push(line);
            }
            else {
                orphans.push(line);
                addListener(line, ret.rhs);
            }
            if(line.fallback) {
                line.fallback.listeners = line.listeners;
            }
        }
    });
    ret.rhs.return = ret;

    // Insert creates before orphans.
    ret.rhs.dependsOn = orphans.concat(ret.rhs.dependsOn);
    ret.rhs.dependsOn = creates.concat(ret.rhs.dependsOn);
    return ret;
}
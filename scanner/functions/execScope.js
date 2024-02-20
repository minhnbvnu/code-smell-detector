function execScope(statement, arg) {
        switch(statement.type) {
            case 'if' :
                var toskip = arg.skip,
                    toexec = arg.exec;
                skipVarList(toskip);
                _.each(toexec, function(st) {
                    sweep(st);
                })
                break;
            case 'try':
                //arg is a 1:1 mapping to catchClause, only execute the ones that are true
                var catchzip = _.zip(arg, statement.catchClause)
                _.each(catchzip, function(mycatch) {
                    if(mycatch[0]){
                        _.each(mycatch[1].lines, function(line){
                            sweep(line);
                        });
                    }else{
                        skipVarList(mycatch[1].lines);
                    }
                });
                _.each(statement.finallyClause, function(myfinally){
                    sweep(myfinally);
                })
                break;
        }
    }
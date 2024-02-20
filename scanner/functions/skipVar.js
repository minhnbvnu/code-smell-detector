function skipVar(statement){
            if (execState[statement.id].state == eventTypes.STATEMENT_SUCCESS){
                return;
            }
            execState[statement.id].state = eventTypes.STATEMENT_SUCCESS;
            switch(statement.type){
                case 'try':
                    _.each(statement.dependsOn, function(tryline){//these are just lines within try{}
                        skipVar(tryline);
                    });
                    _.each(statement.catchClause, function(mycatch,k){
                        _.each(mycatch.lines, function(catchline){
                            skipVar(catchline);
                        });
                    });
                    _.each(statement.finallyClause, function(finallyline){
                        skipVar(finallyline);
                    });
                    break;
                case 'if':
                    _.each(statement.if, function(st) {
                        skipVar(st);
                    });
                    _.each(statement.else, function(st) {
                        skipVar(st);
                    });
                    break;
                default:
                    if(!statement.assign){
                        return;
                    }
                    context[statement.assign] = null;
                    _.each(statement.listeners, function(listener) {
                        execState[listener.id].count--;
                        if (!(listener.fbhold)){
                            if(listener.type === 'try'){
                                listener.lock = false;
                            }
                            return listener;
                        }
                    });
            }

        }
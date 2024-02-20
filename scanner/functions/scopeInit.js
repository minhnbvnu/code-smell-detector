function scopeInit(statement) {
            switch(statement.type){
                case 'if':
                    init(statement.condition);
                    _.each(statement.if, function(line){
                        init(line);
                    });
                    _.each(statement.else, function(line){
                        init(line);
                    });
                    break;
                case 'try':
                    _.each(statement.dependsOn, function(line){
                        init(line);
                    });
                    _.each(statement.catchClause, function(currentcatch){
                        init(currentcatch.condition);
                        _.each(currentcatch.lines, function(line){
                            init(line);
                        });
                    });
                    if(statement.finallyClause) {
                        _.each(statement.finallyClause, function(line){
                            init(line);
                        });
                    }
                    break;
            }
        }
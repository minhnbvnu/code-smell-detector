function findThrows(tryClause){
                if(!tryClause){
                    return [];
                }
                var errMap = [];
                for (var i = 0; i < tryClause.length; i++){
                    var thistry = tryClause[i];
                    if(thistry.type === 'throw'){
                        errMap.push(thistry.err);
                    }else if(thistry.type === 'if'){
                        errMap = errMap.concat(findThrows(thistry.if));
                        errMap = errMap.concat(findThrows(thistry.else));
                    }else if (thistry.type === 'try'){
                        errMap = errMap.concat(findThrows(thistry.tryClause));
                        errMap = errMap.concat(findThrows(thistry.catchClause));
                        errMap = errMap.concat(findThrows(thistry.finallyClause));
                    }
                }
                return errMap;
            }
function countLogicVars(condition){
                var fallback, ret;
                if (condition.fallback){
                    fallback = countLogicVars(condition.fallback);
                }else{
                    fallback = [];
                }
                switch(condition.logic){
                    case 'and':
                        ret = _.all(condition.values, function(onecond){
                            return countLogicVars(onecond);
                        });
                    case 'not':
                        ret = !countLogicVars(condition.values);
                    default://normal
                        ret = [condition.values];
                }
                return ret.concat(fallback);
            }
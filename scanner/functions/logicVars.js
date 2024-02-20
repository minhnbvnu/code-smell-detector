function logicVars(condition, symbols){
    if(_.isString(condition.values)){
        var conditionDep = symbols[condition.values];
        if (conditionDep) {
            return [conditionDep];
        }else{
            return [];
        }
    }
    else if (!_.isArray(condition.values)){
        return logicVars(condition.values, symbols);
    }
    return _.reduce(condition.values, function(memo, val){
        return memo.concat(logicVars(val, symbols));
    }, [])
}
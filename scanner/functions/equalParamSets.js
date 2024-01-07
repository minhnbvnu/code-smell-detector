function equalParamSets(params1, params2) {
    for (const param in params1) { // compare A -> B
        if (params1.hasOwnProperty(param) && !paramsIdentical(params1[param], params2[param]))
            return false;
    }
    for (const param in params2) { // compare B -> A
        if (params2.hasOwnProperty(param) && !paramsIdentical(params2[param], params1[param]))
            return false;
    }
    return true;
}
function mapToFormalArg(argName) {
        var index = formalArgList.indexOf(argName);
        if (index === -1) {
            throw 'Actual arg "' + argName + '" not found in formal arg list ' + formalArgList;
        }
        return args[index];
    }
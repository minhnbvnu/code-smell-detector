function getVarVal(varname) {
        if(varname.indexOf("{") === 0 && varname.indexOf("}") === varname.length - 1) {
            return varname.substring(1, varname.length - 1);
        }
        else return varname;
    }
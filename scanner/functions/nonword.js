function nonword(str) {
            str = _.toStr(str);
            return str ? str.split(/\W+/) : [];
        }
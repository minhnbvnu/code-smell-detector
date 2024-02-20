function validateKeyword(definition, throwError) {
        validateKeyword.errors = null;
        var v = this._validateKeyword = this._validateKeyword
            || this.compile(definitionSchema, true);
        if (v(definition))
            return true;
        validateKeyword.errors = v.errors;
        if (throwError)
            throw new Error('custom keyword definition is invalid: ' + this.errorsText(v.errors));
        else
            return false;
    }
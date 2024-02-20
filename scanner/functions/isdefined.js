function isdefined(context, variable) {
        try {
            variable.eval(context);
            return keyword_1.default.True;
        }
        catch (e) {
            return keyword_1.default.False;
        }
    }
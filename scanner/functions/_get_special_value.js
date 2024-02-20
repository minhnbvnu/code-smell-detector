function _get_special_value(name, special_vars) {
        if (name in special_vars)
            return special_vars[name];
        else
            throw new Error(`Unknown special variable '\$${name}'`);
    }
function var_exists(defined, name) {
            return defined[name] || identifier_atom[name] || scope.var_names()[name];
        }
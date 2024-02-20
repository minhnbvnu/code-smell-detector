function all_constant(list, scope) {
            for (var i = list.length; --i >= 0;)
                if (!list[i].is_constant_expression(scope))
                    return false;
            return true;
        }
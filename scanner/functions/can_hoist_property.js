function can_hoist_property(prop) {
        return prop instanceof AST_ObjectKeyVal
            && typeof prop.key == "string"
            && !(prop instanceof AST_ObjectMethod && prop.value.contains_super());
    }
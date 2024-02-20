function is_empty(thing) {
            if (thing === null)
                return true;
            if (thing instanceof AST_EmptyStatement)
                return true;
            if (thing instanceof AST_BlockStatement)
                return thing.body.length == 0;
            return false;
        }
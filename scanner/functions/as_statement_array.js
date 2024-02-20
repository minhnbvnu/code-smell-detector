function as_statement_array(thing) {
            if (thing === null)
                return [];
            if (thing instanceof AST_BlockStatement)
                return thing.body;
            if (thing instanceof AST_EmptyStatement)
                return [];
            if (thing instanceof AST_Statement)
                return [thing];
            throw new Error("Can't convert thing to statement array");
        }
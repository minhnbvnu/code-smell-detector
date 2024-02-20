function To_Moz_MethodDefinition(kind) {
        return function(M) {
            var computed = M.key instanceof AST_Node;
            var key = computed ? to_moz(M.key) : M.private ? {
                type: "PrivateIdentifier",
                name: M.key.slice(1),
            } : {
                type: "Literal",
                value: M.key,
            };
            return {
                type: "MethodDefinition",
                kind: kind,
                computed: computed,
                key: key,
                static: M.static,
                value: to_moz(M.value),
            };
        };
    }
function extract_declarations_from_unreachable_code(compressor, stat, target) {
        var block;
        var dropped = false;
        stat.walk(new TreeWalker(function(node, descend) {
            if (node instanceof AST_DefClass) {
                node.extends = null;
                node.properties = [];
                push(node);
                return true;
            }
            if (node instanceof AST_Definitions) {
                var defns = [];
                if (node.remove_initializers(compressor, defns)) {
                    AST_Node.warn("Dropping initialization in unreachable code [{file}:{line},{col}]", node.start);
                }
                if (defns.length > 0) {
                    node.definitions = defns;
                    push(node);
                }
                return true;
            }
            if (node instanceof AST_LambdaDefinition) {
                push(node);
                return true;
            }
            if (node instanceof AST_Scope) return true;
            if (node instanceof AST_BlockScope) {
                var save = block;
                block = [];
                descend();
                if (block.required) {
                    target.push(make_node(AST_BlockStatement, stat, { body: block }));
                } else if (block.length) {
                    [].push.apply(target, block);
                }
                block = save;
                return true;
            }
            if (!(node instanceof AST_LoopControl)) dropped = true;
        }));
        if (dropped) AST_Node.warn("Dropping unreachable code [{file}:{line},{col}]", stat.start);

        function push(node) {
            if (block) {
                block.push(node);
                if (!safe_to_trim(node)) block.required = true;
            } else {
                target.push(node);
            }
        }
    }
function is_direct_assignment(node, parent) {
                if (parent instanceof AST_Assign) return parent.operator == "=" && parent.left === node;
                if (parent instanceof AST_DefaultValue) return parent.name === node;
                if (parent instanceof AST_DestructuredArray) return true;
                if (parent instanceof AST_DestructuredKeyVal) return parent.value === node;
            }
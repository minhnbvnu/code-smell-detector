function in_conditional(node, parent) {
                if (parent instanceof AST_Assign) return parent.left !== node && lazy_op[parent.operator.slice(0, -1)];
                if (parent instanceof AST_Binary) return parent.left !== node && lazy_op[parent.operator];
                if (parent instanceof AST_Call) return parent.optional && parent.expression !== node;
                if (parent instanceof AST_Case) return parent.expression !== node;
                if (parent instanceof AST_Conditional) return parent.condition !== node;
                if (parent instanceof AST_If) return parent.condition !== node;
                if (parent instanceof AST_Sub) return parent.optional && parent.expression !== node;
            }
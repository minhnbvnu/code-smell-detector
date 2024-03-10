function mark_escaped(tw, d, scope, node, value, level = 0, depth = 1) {
            var parent = tw.parent(level);
            if (value) {
                if (value.is_constant())
                    return;
                if (value instanceof AST_ClassExpression)
                    return;
            }
            if (parent instanceof AST_Assign && (parent.operator === "=" || parent.logical) && node === parent.right
                || parent instanceof AST_Call && (node !== parent.expression || parent instanceof AST_New)
                || parent instanceof AST_Exit && node === parent.value && node.scope !== d.scope
                || parent instanceof AST_VarDef && node === parent.value
                || parent instanceof AST_Yield && node === parent.value && node.scope !== d.scope) {
                if (depth > 1 && !(value && value.is_constant_expression(scope)))
                    depth = 1;
                if (!d.escaped || d.escaped > depth)
                    d.escaped = depth;
                return;
            }
            else if (parent instanceof AST_Array
                || parent instanceof AST_Await
                || parent instanceof AST_Binary && lazy_op.has(parent.operator)
                || parent instanceof AST_Conditional && node !== parent.condition
                || parent instanceof AST_Expansion
                || parent instanceof AST_Sequence && node === parent.tail_node()) {
                mark_escaped(tw, d, scope, parent, parent, level + 1, depth);
            }
            else if (parent instanceof AST_ObjectKeyVal && node === parent.value) {
                var obj = tw.parent(level + 1);
                mark_escaped(tw, d, scope, obj, obj, level + 2, depth);
            }
            else if (parent instanceof AST_PropAccess && node === parent.expression) {
                value = read_property(value, parent.property);
                mark_escaped(tw, d, scope, parent, value, level + 1, depth + 1);
                if (value)
                    return;
            }
            if (level > 0)
                return;
            if (parent instanceof AST_Sequence && node !== parent.tail_node())
                return;
            if (parent instanceof AST_SimpleStatement)
                return;
            d.direct_access = true;
        }
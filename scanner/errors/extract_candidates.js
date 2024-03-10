function extract_candidates(expr) {
                    hit_stack.push(expr);
                    if (expr instanceof AST_Assign) {
                        if (!expr.left.has_side_effects(compressor)
                            && !(expr.right instanceof AST_Chain)) {
                            candidates.push(hit_stack.slice());
                        }
                        extract_candidates(expr.right);
                    }
                    else if (expr instanceof AST_Binary) {
                        extract_candidates(expr.left);
                        extract_candidates(expr.right);
                    }
                    else if (expr instanceof AST_Call && !has_annotation(expr, _NOINLINE)) {
                        extract_candidates(expr.expression);
                        expr.args.forEach(extract_candidates);
                    }
                    else if (expr instanceof AST_Case) {
                        extract_candidates(expr.expression);
                    }
                    else if (expr instanceof AST_Conditional) {
                        extract_candidates(expr.condition);
                        extract_candidates(expr.consequent);
                        extract_candidates(expr.alternative);
                    }
                    else if (expr instanceof AST_Definitions) {
                        var len = expr.definitions.length;
                        // limit number of trailing variable definitions for consideration
                        var i = len - 200;
                        if (i < 0)
                            i = 0;
                        for (; i < len; i++) {
                            extract_candidates(expr.definitions[i]);
                        }
                    }
                    else if (expr instanceof AST_DWLoop) {
                        extract_candidates(expr.condition);
                        if (!(expr.body instanceof AST_Block)) {
                            extract_candidates(expr.body);
                        }
                    }
                    else if (expr instanceof AST_Exit) {
                        if (expr.value)
                            extract_candidates(expr.value);
                    }
                    else if (expr instanceof AST_For) {
                        if (expr.init)
                            extract_candidates(expr.init);
                        if (expr.condition)
                            extract_candidates(expr.condition);
                        if (expr.step)
                            extract_candidates(expr.step);
                        if (!(expr.body instanceof AST_Block)) {
                            extract_candidates(expr.body);
                        }
                    }
                    else if (expr instanceof AST_ForIn) {
                        extract_candidates(expr.object);
                        if (!(expr.body instanceof AST_Block)) {
                            extract_candidates(expr.body);
                        }
                    }
                    else if (expr instanceof AST_If) {
                        extract_candidates(expr.condition);
                        if (!(expr.body instanceof AST_Block)) {
                            extract_candidates(expr.body);
                        }
                        if (expr.alternative && !(expr.alternative instanceof AST_Block)) {
                            extract_candidates(expr.alternative);
                        }
                    }
                    else if (expr instanceof AST_Sequence) {
                        expr.expressions.forEach(extract_candidates);
                    }
                    else if (expr instanceof AST_SimpleStatement) {
                        extract_candidates(expr.body);
                    }
                    else if (expr instanceof AST_Switch) {
                        extract_candidates(expr.expression);
                        expr.body.forEach(extract_candidates);
                    }
                    else if (expr instanceof AST_Unary) {
                        if (expr.operator == "++" || expr.operator == "--") {
                            candidates.push(hit_stack.slice());
                        }
                    }
                    else if (expr instanceof AST_VarDef) {
                        if (expr.value && !(expr.value instanceof AST_Chain)) {
                            candidates.push(hit_stack.slice());
                            extract_candidates(expr.value);
                        }
                    }
                    hit_stack.pop();
                }
function checkGrammarBreakOrContinueStatement(node) {
                let current = node;
                while (current) {
                    if (isFunctionLikeOrClassStaticBlockDeclaration(current)) {
                        return grammarErrorOnNode(node, Diagnostics.Jump_target_cannot_cross_function_boundary);
                    }
                    switch (current.kind) {
                        case 253 /* LabeledStatement */:
                            if (node.label && current.label.escapedText === node.label.escapedText) {
                                const isMisplacedContinueLabel = node.kind === 248 /* ContinueStatement */ && !isIterationStatement(current.statement, 
                                /*lookInLabeledStatement*/
                                true);
                                if (isMisplacedContinueLabel) {
                                    return grammarErrorOnNode(node, Diagnostics.A_continue_statement_can_only_jump_to_a_label_of_an_enclosing_iteration_statement);
                                }
                                return false;
                            }
                            break;
                        case 252 /* SwitchStatement */:
                            if (node.kind === 249 /* BreakStatement */ && !node.label) {
                                return false;
                            }
                            break;
                        default:
                            if (isIterationStatement(current, 
                            /*lookInLabeledStatement*/
                            false) && !node.label) {
                                return false;
                            }
                            break;
                    }
                    current = current.parent;
                }
                if (node.label) {
                    const message = node.kind === 249 /* BreakStatement */ ? Diagnostics.A_break_statement_can_only_jump_to_a_label_of_an_enclosing_statement : Diagnostics.A_continue_statement_can_only_jump_to_a_label_of_an_enclosing_iteration_statement;
                    return grammarErrorOnNode(node, message);
                }
                else {
                    const message = node.kind === 249 /* BreakStatement */ ? Diagnostics.A_break_statement_can_only_be_used_within_an_enclosing_iteration_or_switch_statement : Diagnostics.A_continue_statement_can_only_be_used_within_an_enclosing_iteration_statement;
                    return grammarErrorOnNode(node, message);
                }
            }
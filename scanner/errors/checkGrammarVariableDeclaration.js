function checkGrammarVariableDeclaration(node) {
                if (node.parent.parent.kind !== 246 /* ForInStatement */ && node.parent.parent.kind !== 247 /* ForOfStatement */) {
                    if (node.flags & 16777216 /* Ambient */) {
                        checkAmbientInitializer(node);
                    }
                    else if (!node.initializer) {
                        if (isBindingPattern(node.name) && !isBindingPattern(node.parent)) {
                            return grammarErrorOnNode(node, Diagnostics.A_destructuring_declaration_must_have_an_initializer);
                        }
                        if (isVarConst(node)) {
                            return grammarErrorOnNode(node, Diagnostics.const_declarations_must_be_initialized);
                        }
                    }
                }
                if (node.exclamationToken && (node.parent.parent.kind !== 240 /* VariableStatement */ || !node.type || node.initializer || node.flags & 16777216 /* Ambient */)) {
                    const message = node.initializer ? Diagnostics.Declarations_with_initializers_cannot_also_have_definite_assignment_assertions : !node.type ? Diagnostics.Declarations_with_definite_assignment_assertions_must_also_have_type_annotations : Diagnostics.A_definite_assignment_assertion_is_not_permitted_in_this_context;
                    return grammarErrorOnNode(node.exclamationToken, message);
                }
                if ((moduleKind < 5 /* ES2015 */ || getSourceFileOfNode(node).impliedNodeFormat === 1 /* CommonJS */) && moduleKind !== 4 /* System */ && !(node.parent.parent.flags & 16777216 /* Ambient */) && hasSyntacticModifier(node.parent.parent, 1 /* Export */)) {
                    checkESModuleMarker(node.name);
                }
                const checkLetConstNames = isLet(node) || isVarConst(node);
                return checkLetConstNames && checkGrammarNameInLetOrConstDeclarations(node.name);
            }
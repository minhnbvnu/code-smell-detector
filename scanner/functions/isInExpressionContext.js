function isInExpressionContext(node) {
            const { parent: parent2 } = node;
            switch (parent2.kind) {
                case 257 /* VariableDeclaration */:
                case 166 /* Parameter */:
                case 169 /* PropertyDeclaration */:
                case 168 /* PropertySignature */:
                case 302 /* EnumMember */:
                case 299 /* PropertyAssignment */:
                case 205 /* BindingElement */:
                    return parent2.initializer === node;
                case 241 /* ExpressionStatement */:
                case 242 /* IfStatement */:
                case 243 /* DoStatement */:
                case 244 /* WhileStatement */:
                case 250 /* ReturnStatement */:
                case 251 /* WithStatement */:
                case 252 /* SwitchStatement */:
                case 292 /* CaseClause */:
                case 254 /* ThrowStatement */:
                    return parent2.expression === node;
                case 245 /* ForStatement */:
                    const forStatement = parent2;
                    return forStatement.initializer === node && forStatement.initializer.kind !== 258 /* VariableDeclarationList */ || forStatement.condition === node || forStatement.incrementor === node;
                case 246 /* ForInStatement */:
                case 247 /* ForOfStatement */:
                    const forInStatement = parent2;
                    return forInStatement.initializer === node && forInStatement.initializer.kind !== 258 /* VariableDeclarationList */ || forInStatement.expression === node;
                case 213 /* TypeAssertionExpression */:
                case 231 /* AsExpression */:
                    return node === parent2.expression;
                case 236 /* TemplateSpan */:
                    return node === parent2.expression;
                case 164 /* ComputedPropertyName */:
                    return node === parent2.expression;
                case 167 /* Decorator */:
                case 291 /* JsxExpression */:
                case 290 /* JsxSpreadAttribute */:
                case 301 /* SpreadAssignment */:
                    return true;
                case 230 /* ExpressionWithTypeArguments */:
                    return parent2.expression === node && !isPartOfTypeNode(parent2);
                case 300 /* ShorthandPropertyAssignment */:
                    return parent2.objectAssignmentInitializer === node;
                case 235 /* SatisfiesExpression */:
                    return node === parent2.expression;
                default:
                    return isExpressionNode(parent2);
            }
        }
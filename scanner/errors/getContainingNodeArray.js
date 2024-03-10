function getContainingNodeArray(node) {
            if (!node.parent)
                return void 0;
            switch (node.kind) {
                case 165 /* TypeParameter */:
                    const { parent: parent3 } = node;
                    return parent3.kind === 192 /* InferType */ ? void 0 : parent3.typeParameters;
                case 166 /* Parameter */:
                    return node.parent.parameters;
                case 201 /* TemplateLiteralTypeSpan */:
                    return node.parent.templateSpans;
                case 236 /* TemplateSpan */:
                    return node.parent.templateSpans;
                case 167 /* Decorator */: {
                    const { parent: parent4 } = node;
                    return canHaveDecorators(parent4) ? parent4.modifiers : void 0;
                }
                case 294 /* HeritageClause */:
                    return node.parent.heritageClauses;
            }
            const { parent: parent2 } = node;
            if (isJSDocTag(node)) {
                return isJSDocTypeLiteral(node.parent) ? void 0 : node.parent.tags;
            }
            switch (parent2.kind) {
                case 184 /* TypeLiteral */:
                case 261 /* InterfaceDeclaration */:
                    return isTypeElement(node) ? parent2.members : void 0;
                case 189 /* UnionType */:
                case 190 /* IntersectionType */:
                    return parent2.types;
                case 186 /* TupleType */:
                case 206 /* ArrayLiteralExpression */:
                case 357 /* CommaListExpression */:
                case 272 /* NamedImports */:
                case 276 /* NamedExports */:
                    return parent2.elements;
                case 207 /* ObjectLiteralExpression */:
                case 289 /* JsxAttributes */:
                    return parent2.properties;
                case 210 /* CallExpression */:
                case 211 /* NewExpression */:
                    return isTypeNode(node) ? parent2.typeArguments : parent2.expression === node ? void 0 : parent2.arguments;
                case 281 /* JsxElement */:
                case 285 /* JsxFragment */:
                    return isJsxChild(node) ? parent2.children : void 0;
                case 283 /* JsxOpeningElement */:
                case 282 /* JsxSelfClosingElement */:
                    return isTypeNode(node) ? parent2.typeArguments : void 0;
                case 238 /* Block */:
                case 292 /* CaseClause */:
                case 293 /* DefaultClause */:
                case 265 /* ModuleBlock */:
                    return parent2.statements;
                case 266 /* CaseBlock */:
                    return parent2.clauses;
                case 260 /* ClassDeclaration */:
                case 228 /* ClassExpression */:
                    return isClassElement(node) ? parent2.members : void 0;
                case 263 /* EnumDeclaration */:
                    return isEnumMember(node) ? parent2.members : void 0;
                case 308 /* SourceFile */:
                    return parent2.statements;
            }
        }
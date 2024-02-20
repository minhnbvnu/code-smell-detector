function createConditionalTypeNode(checkType, extendsType, trueType, falseType) {
                const node = createBaseNode(191 /* ConditionalType */);
                node.checkType = parenthesizerRules().parenthesizeCheckTypeOfConditionalType(checkType);
                node.extendsType = parenthesizerRules().parenthesizeExtendsTypeOfConditionalType(extendsType);
                node.trueType = trueType;
                node.falseType = falseType;
                node.transformFlags = 1 /* ContainsTypeScript */;
                node.locals = void 0;
                node.nextContainer = void 0;
                return node;
            }
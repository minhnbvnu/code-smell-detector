function processTaggedTemplateExpression(context, node, visitor, currentSourceFile, recordTaggedTemplateString, level) {
            const tag = visitNode(node.tag, visitor, isExpression);
            Debug.assert(tag);
            const templateArguments = [void 0];
            const cookedStrings = [];
            const rawStrings = [];
            const template = node.template;
            if (level === 0 /* LiftRestriction */ && !hasInvalidEscape(template)) {
                return visitEachChild(node, visitor, context);
            }
            if (isNoSubstitutionTemplateLiteral(template)) {
                cookedStrings.push(createTemplateCooked(template));
                rawStrings.push(getRawLiteral(template, currentSourceFile));
            }
            else {
                cookedStrings.push(createTemplateCooked(template.head));
                rawStrings.push(getRawLiteral(template.head, currentSourceFile));
                for (const templateSpan of template.templateSpans) {
                    cookedStrings.push(createTemplateCooked(templateSpan.literal));
                    rawStrings.push(getRawLiteral(templateSpan.literal, currentSourceFile));
                    templateArguments.push(Debug.checkDefined(visitNode(templateSpan.expression, visitor, isExpression)));
                }
            }
            const helperCall = context.getEmitHelperFactory().createTemplateObjectHelper(factory.createArrayLiteralExpression(cookedStrings), factory.createArrayLiteralExpression(rawStrings));
            if (isExternalModule(currentSourceFile)) {
                const tempVar = factory.createUniqueName("templateObject");
                recordTaggedTemplateString(tempVar);
                templateArguments[0] = factory.createLogicalOr(tempVar, factory.createAssignment(tempVar, helperCall));
            }
            else {
                templateArguments[0] = helperCall;
            }
            return factory.createCallExpression(tag, 
            /*typeArguments*/
            void 0, templateArguments);
        }
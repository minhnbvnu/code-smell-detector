function createObjectTypeFromLabeledExpression(checker, label, expression) {
            const member = checker.createSymbol(4 /* Property */, label.escapedText);
            member.links.type = checker.getTypeAtLocation(expression);
            const members = createSymbolTable([member]);
            return checker.createAnonymousType(
            /*symbol*/
            void 0, members, [], [], []);
        }
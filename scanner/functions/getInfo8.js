function getInfo8(program, sourceFile, span) {
            const diag2 = find(program.getSemanticDiagnostics(sourceFile), (diag3) => diag3.start === span.start && diag3.length === span.length);
            if (diag2 === void 0 || diag2.relatedInformation === void 0)
                return;
            const related = find(diag2.relatedInformation, (related2) => related2.code === Diagnostics.Did_you_mean_0.code);
            if (related === void 0 || related.file === void 0 || related.start === void 0 || related.length === void 0)
                return;
            const token = findAncestorMatchingSpan(related.file, createTextSpan(related.start, related.length));
            if (token === void 0)
                return;
            if (isExpression(token) && isBinaryExpression(token.parent)) {
                return { suggestion: getSuggestion(related.messageText), expression: token.parent, arg: token };
            }
            return void 0;
        }
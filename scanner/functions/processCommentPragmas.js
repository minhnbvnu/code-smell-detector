function processCommentPragmas(context, sourceText) {
            const pragmas = [];
            for (const range of getLeadingCommentRanges(sourceText, 0) || emptyArray) {
                const comment = sourceText.substring(range.pos, range.end);
                extractPragmas(pragmas, range, comment);
            }
            context.pragmas = /* @__PURE__ */ new Map();
            for (const pragma of pragmas) {
                if (context.pragmas.has(pragma.name)) {
                    const currentValue = context.pragmas.get(pragma.name);
                    if (currentValue instanceof Array) {
                        currentValue.push(pragma.args);
                    }
                    else {
                        context.pragmas.set(pragma.name, [currentValue, pragma.args]);
                    }
                    continue;
                }
                context.pragmas.set(pragma.name, pragma.args);
            }
        }
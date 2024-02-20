function stringLiteralCompletionDetails(name, location, completion, sourceFile, checker, cancellationToken) {
            switch (completion.kind) {
                case 0 /* Paths */: {
                    const match = find(completion.paths, (p) => p.name === name);
                    return match && createCompletionDetails(name, kindModifiersFromExtension(match.extension), match.kind, [textPart(name)]);
                }
                case 1 /* Properties */: {
                    const match = find(completion.symbols, (s) => s.name === name);
                    return match && createCompletionDetailsForSymbol(match, match.name, checker, sourceFile, location, cancellationToken);
                }
                case 2 /* Types */:
                    return find(completion.types, (t) => t.value === name) ? createCompletionDetails(name, "" /* none */, "string" /* string */, [textPart(name)]) : void 0;
                default:
                    return Debug.assertNever(completion);
            }
        }
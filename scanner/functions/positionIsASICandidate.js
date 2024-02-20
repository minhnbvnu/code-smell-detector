function positionIsASICandidate(pos, context, sourceFile) {
            const contextAncestor = findAncestor(context, (ancestor) => {
                if (ancestor.end !== pos) {
                    return "quit";
                }
                return syntaxMayBeASICandidate(ancestor.kind);
            });
            return !!contextAncestor && nodeIsASICandidate(contextAncestor, sourceFile);
        }
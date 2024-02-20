function getDefinitionAndBoundSpan(program, sourceFile, position) {
            const definitions = getDefinitionAtPosition(program, sourceFile, position);
            if (!definitions || definitions.length === 0) {
                return void 0;
            }
            const comment = findReferenceInPosition(sourceFile.referencedFiles, position) || findReferenceInPosition(sourceFile.typeReferenceDirectives, position) || findReferenceInPosition(sourceFile.libReferenceDirectives, position);
            if (comment) {
                return { definitions, textSpan: createTextSpanFromRange(comment) };
            }
            const node = getTouchingPropertyName(sourceFile, position);
            const textSpan = createTextSpan(node.getStart(), node.getWidth());
            return { definitions, textSpan };
        }
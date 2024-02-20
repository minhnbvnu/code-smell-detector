function rangeOfTypeParameters(sourceFile, typeParameters) {
            const pos = typeParameters.pos - 1;
            const end = Math.min(sourceFile.text.length, skipTrivia(sourceFile.text, typeParameters.end) + 1);
            return { pos, end };
        }
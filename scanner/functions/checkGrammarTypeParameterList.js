function checkGrammarTypeParameterList(typeParameters, file) {
                if (typeParameters && typeParameters.length === 0) {
                    const start = typeParameters.pos - "<".length;
                    const end = skipTrivia(file.text, typeParameters.end) + ">".length;
                    return grammarErrorAtPos(file, start, end - start, Diagnostics.Type_parameter_list_cannot_be_empty);
                }
                return false;
            }
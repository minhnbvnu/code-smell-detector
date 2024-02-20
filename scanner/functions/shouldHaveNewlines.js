function shouldHaveNewlines(elements, hasLeftNewline) {
                if (multilineArgumentsOption && elements.length === 1) {
                    return hasLeftNewline;
                }
                if (multilineOption || multilineArgumentsOption) {
                    return elements.some((element, index) => index !== elements.length - 1 && element.loc.end.line !== elements[index + 1].loc.start.line);
                }
                if (consistentOption) {
                    return hasLeftNewline;
                }
                return elements.length >= minItems;
            }
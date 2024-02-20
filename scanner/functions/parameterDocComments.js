function parameterDocComments(parameters, isJavaScriptFile, indentationStr, newLine) {
            return parameters.map(({ name, dotDotDotToken }, i) => {
                const paramName = name.kind === 79 /* Identifier */ ? name.text : "param" + i;
                const type = isJavaScriptFile ? dotDotDotToken ? "{...any} " : "{any} " : "";
                return `${indentationStr} * @param ${type}${paramName}${newLine}`;
            }).join("");
        }
function getPropertyWhitespace(property) {
                const whitespace = /(\s*):(\s*)/u.exec(sourceCode.getText().slice(property.key.range[1], property.value.range[0]));
                if (whitespace) {
                    return {
                        beforeColon: whitespace[1],
                        afterColon: whitespace[2]
                    };
                }
                return null;
            }
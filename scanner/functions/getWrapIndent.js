function getWrapIndent() {
            var indentation = 0;
            if (maxIndent === 0)
                return indentation;
            if (indentedSoftWrap) {
                for (var i = 0; i < tokens.length; i++) {
                    var token = tokens[i];
                    if (token == SPACE)
                        indentation += 1;
                    else if (token == TAB)
                        indentation += tabSize;
                    else if (token == TAB_SPACE)
                        continue;
                    else
                        break;
                }
            }
            if (isCode && indentedSoftWrap !== false)
                indentation += tabSize;
            return Math.min(indentation, maxIndent);
        }
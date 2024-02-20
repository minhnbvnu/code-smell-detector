function scanRange(start2, length3, callback) {
                const saveEnd = end;
                const savePos = pos;
                const saveStartPos = startPos;
                const saveTokenPos = tokenPos;
                const saveToken = token;
                const saveTokenValue = tokenValue;
                const saveTokenFlags = tokenFlags;
                const saveErrorExpectations = commentDirectives;
                setText(text, start2, length3);
                const result = callback();
                end = saveEnd;
                pos = savePos;
                startPos = saveStartPos;
                tokenPos = saveTokenPos;
                token = saveToken;
                tokenValue = saveTokenValue;
                tokenFlags = saveTokenFlags;
                commentDirectives = saveErrorExpectations;
                return result;
            }
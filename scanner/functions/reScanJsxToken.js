function reScanJsxToken(allowMultilineJsxText = true) {
                pos = tokenPos = startPos;
                return token = scanJsxToken(allowMultilineJsxText);
            }
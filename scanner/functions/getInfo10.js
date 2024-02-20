function getInfo10(sourceFile, pos) {
            const token = getTokenAtPosition(sourceFile, pos);
            if (token.parent && isJSDocParameterTag(token.parent) && isIdentifier(token.parent.name)) {
                const jsDocParameterTag = token.parent;
                const jsDocHost = getJSDocHost(jsDocParameterTag);
                const signature = getHostSignatureFromJSDoc(jsDocParameterTag);
                if (jsDocHost && signature) {
                    return { jsDocHost, signature, name: token.parent.name, jsDocParameterTag };
                }
            }
            return void 0;
        }
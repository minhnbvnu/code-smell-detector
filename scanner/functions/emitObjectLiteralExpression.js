function emitObjectLiteralExpression(node) {
                pushPrivateNameGenerationScope(0 /* Auto */, 
                /*newReservedMemberNames*/
                void 0);
                forEach(node.properties, generateMemberNames);
                const indentedFlag = getEmitFlags(node) & 131072 /* Indented */;
                if (indentedFlag) {
                    increaseIndent();
                }
                const preferNewLine = node.multiLine ? 65536 /* PreferNewLine */ : 0 /* None */;
                const allowTrailingComma = currentSourceFile && currentSourceFile.languageVersion >= 1 /* ES5 */ && !isJsonSourceFile(currentSourceFile) ? 64 /* AllowTrailingComma */ : 0 /* None */;
                emitList(node, node.properties, 526226 /* ObjectLiteralExpressionProperties */ | allowTrailingComma | preferNewLine);
                if (indentedFlag) {
                    decreaseIndent();
                }
                popPrivateNameGenerationScope();
            }
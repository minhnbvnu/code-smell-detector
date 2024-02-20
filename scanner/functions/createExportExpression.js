function createExportExpression(name, value) {
                const exportName = isIdentifier(name) ? factory2.createStringLiteralFromNode(name) : name;
                setEmitFlags(value, getEmitFlags(value) | 3072 /* NoComments */);
                return setCommentRange(factory2.createCallExpression(exportFunction, 
                /*typeArguments*/
                void 0, [exportName, value]), value);
            }
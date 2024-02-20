function getDocCommentTemplateAtPosition(newLine, sourceFile, position, options) {
            const tokenAtPos = getTokenAtPosition(sourceFile, position);
            const existingDocComment = findAncestor(tokenAtPos, isJSDoc);
            if (existingDocComment && (existingDocComment.comment !== void 0 || length(existingDocComment.tags))) {
                return void 0;
            }
            const tokenStart = tokenAtPos.getStart(sourceFile);
            if (!existingDocComment && tokenStart < position) {
                return void 0;
            }
            const commentOwnerInfo = getCommentOwnerInfo(tokenAtPos, options);
            if (!commentOwnerInfo) {
                return void 0;
            }
            const { commentOwner, parameters, hasReturn: hasReturn2 } = commentOwnerInfo;
            const commentOwnerJsDoc = hasJSDocNodes(commentOwner) && commentOwner.jsDoc ? commentOwner.jsDoc : void 0;
            const lastJsDoc = lastOrUndefined(commentOwnerJsDoc);
            if (commentOwner.getStart(sourceFile) < position || lastJsDoc && existingDocComment && lastJsDoc !== existingDocComment) {
                return void 0;
            }
            const indentationStr = getIndentationStringAtPosition(sourceFile, position);
            const isJavaScriptFile = hasJSFileExtension(sourceFile.fileName);
            const tags = (parameters ? parameterDocComments(parameters || [], isJavaScriptFile, indentationStr, newLine) : "") + (hasReturn2 ? returnsDocComment(indentationStr, newLine) : "");
            const openComment = "/**";
            const closeComment = " */";
            const hasTag = (commentOwnerJsDoc || []).some((jsDoc) => !!jsDoc.tags);
            if (tags && !hasTag) {
                const preamble = openComment + newLine + indentationStr + " * ";
                const endLine = tokenStart === position ? newLine + indentationStr : "";
                const result = preamble + newLine + tags + indentationStr + closeComment + endLine;
                return { newText: result, caretOffset: preamble.length };
            }
            return { newText: openComment + closeComment, caretOffset: 3 };
        }
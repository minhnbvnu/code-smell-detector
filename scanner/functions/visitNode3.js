function visitNode3(n2) {
                var _a2;
                if (depthRemaining === 0)
                    return;
                cancellationToken.throwIfCancellationRequested();
                if (isDeclaration(n2) || isVariableStatement(n2) || isReturnStatement(n2) || isCallOrNewExpression(n2) || n2.kind === 1 /* EndOfFileToken */) {
                    addOutliningForLeadingCommentsForNode(n2, sourceFile, cancellationToken, out);
                }
                if (isFunctionLike(n2) && isBinaryExpression(n2.parent) && isPropertyAccessExpression(n2.parent.left)) {
                    addOutliningForLeadingCommentsForNode(n2.parent.left, sourceFile, cancellationToken, out);
                }
                if (isBlock(n2) || isModuleBlock(n2)) {
                    addOutliningForLeadingCommentsForPos(n2.statements.end, sourceFile, cancellationToken, out);
                }
                if (isClassLike(n2) || isInterfaceDeclaration(n2)) {
                    addOutliningForLeadingCommentsForPos(n2.members.end, sourceFile, cancellationToken, out);
                }
                const span = getOutliningSpanForNode(n2, sourceFile);
                if (span)
                    out.push(span);
                depthRemaining--;
                if (isCallExpression(n2)) {
                    depthRemaining++;
                    visitNode3(n2.expression);
                    depthRemaining--;
                    n2.arguments.forEach(visitNode3);
                    (_a2 = n2.typeArguments) == null ? void 0 : _a2.forEach(visitNode3);
                }
                else if (isIfStatement(n2) && n2.elseStatement && isIfStatement(n2.elseStatement)) {
                    visitNode3(n2.expression);
                    visitNode3(n2.thenStatement);
                    depthRemaining++;
                    visitNode3(n2.elseStatement);
                    depthRemaining--;
                }
                else {
                    n2.forEachChild(visitNode3);
                }
                depthRemaining++;
            }
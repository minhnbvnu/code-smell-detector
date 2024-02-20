function convertExportsPropertyAssignment({ left, right, parent: parent2 }, sourceFile, changes) {
            const name = left.name.text;
            if ((isFunctionExpression(right) || isArrowFunction(right) || isClassExpression(right)) && (!right.name || right.name.text === name)) {
                changes.replaceRange(sourceFile, { pos: left.getStart(sourceFile), end: right.getStart(sourceFile) }, factory.createToken(93 /* ExportKeyword */), { suffix: " " });
                if (!right.name)
                    changes.insertName(sourceFile, right, name);
                const semi = findChildOfKind(parent2, 26 /* SemicolonToken */, sourceFile);
                if (semi)
                    changes.delete(sourceFile, semi);
            }
            else {
                changes.replaceNodeRangeWithNodes(sourceFile, left.expression, findChildOfKind(left, 24 /* DotToken */, sourceFile), [factory.createToken(93 /* ExportKeyword */), factory.createToken(85 /* ConstKeyword */)], { joiner: " ", suffix: " " });
            }
        }
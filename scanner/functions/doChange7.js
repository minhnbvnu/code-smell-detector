function doChange7(changes, sourceFile, pos, checker) {
            const token = getTokenAtPosition(sourceFile, pos);
            if (!isThis(token))
                return void 0;
            const fn = getThisContainer(token, 
            /*includeArrowFunctions*/
            false, 
            /*includeClassComputedPropertyName*/
            false);
            if (!isFunctionDeclaration(fn) && !isFunctionExpression(fn))
                return void 0;
            if (!isSourceFile(getThisContainer(fn, 
            /*includeArrowFunctions*/
            false, 
            /*includeClassComputedPropertyName*/
            false))) {
                const fnKeyword = Debug.checkDefined(findChildOfKind(fn, 98 /* FunctionKeyword */, sourceFile));
                const { name } = fn;
                const body = Debug.checkDefined(fn.body);
                if (isFunctionExpression(fn)) {
                    if (name && ts_FindAllReferences_exports.Core.isSymbolReferencedInFile(name, checker, sourceFile, body)) {
                        return void 0;
                    }
                    changes.delete(sourceFile, fnKeyword);
                    if (name) {
                        changes.delete(sourceFile, name);
                    }
                    changes.insertText(sourceFile, body.pos, " =>");
                    return [Diagnostics.Convert_function_expression_0_to_arrow_function, name ? name.text : ANONYMOUS];
                }
                else {
                    changes.replaceNode(sourceFile, fnKeyword, factory.createToken(85 /* ConstKeyword */));
                    changes.insertText(sourceFile, name.end, " = ");
                    changes.insertText(sourceFile, body.pos, " =>");
                    return [Diagnostics.Convert_function_declaration_0_to_arrow_function, name.text];
                }
            }
        }
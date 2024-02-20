function computeSuggestionDiagnostics(sourceFile, program, cancellationToken) {
            program.getSemanticDiagnostics(sourceFile, cancellationToken);
            const diags = [];
            const checker = program.getTypeChecker();
            const isCommonJSFile = sourceFile.impliedNodeFormat === 1 /* CommonJS */ || fileExtensionIsOneOf(sourceFile.fileName, [".cts" /* Cts */, ".cjs" /* Cjs */]);
            if (!isCommonJSFile && sourceFile.commonJsModuleIndicator && (programContainsEsModules(program) || compilerOptionsIndicateEsModules(program.getCompilerOptions())) && containsTopLevelCommonjs(sourceFile)) {
                diags.push(createDiagnosticForNode(getErrorNodeFromCommonJsIndicator(sourceFile.commonJsModuleIndicator), Diagnostics.File_is_a_CommonJS_module_it_may_be_converted_to_an_ES_module));
            }
            const isJsFile = isSourceFileJS(sourceFile);
            visitedNestedConvertibleFunctions.clear();
            check(sourceFile);
            if (getAllowSyntheticDefaultImports(program.getCompilerOptions())) {
                for (const moduleSpecifier of sourceFile.imports) {
                    const importNode = importFromModuleSpecifier(moduleSpecifier);
                    const name = importNameForConvertToDefaultImport(importNode);
                    if (!name)
                        continue;
                    const module2 = getResolvedModule(sourceFile, moduleSpecifier.text, getModeForUsageLocation(sourceFile, moduleSpecifier));
                    const resolvedFile = module2 && program.getSourceFile(module2.resolvedFileName);
                    if (resolvedFile && resolvedFile.externalModuleIndicator && resolvedFile.externalModuleIndicator !== true && isExportAssignment(resolvedFile.externalModuleIndicator) && resolvedFile.externalModuleIndicator.isExportEquals) {
                        diags.push(createDiagnosticForNode(name, Diagnostics.Import_may_be_converted_to_a_default_import));
                    }
                }
            }
            addRange(diags, sourceFile.bindSuggestionDiagnostics);
            addRange(diags, program.getSuggestionDiagnostics(sourceFile, cancellationToken));
            return diags.sort((d1, d2) => d1.start - d2.start);
            function check(node) {
                if (isJsFile) {
                    if (canBeConvertedToClass(node, checker)) {
                        diags.push(createDiagnosticForNode(isVariableDeclaration(node.parent) ? node.parent.name : node, Diagnostics.This_constructor_function_may_be_converted_to_a_class_declaration));
                    }
                }
                else {
                    if (isVariableStatement(node) && node.parent === sourceFile && node.declarationList.flags & 2 /* Const */ && node.declarationList.declarations.length === 1) {
                        const init = node.declarationList.declarations[0].initializer;
                        if (init && isRequireCall(init, 
                        /*checkArgumentIsStringLiteralLike*/
                        true)) {
                            diags.push(createDiagnosticForNode(init, Diagnostics.require_call_may_be_converted_to_an_import));
                        }
                    }
                    if (ts_codefix_exports.parameterShouldGetTypeFromJSDoc(node)) {
                        diags.push(createDiagnosticForNode(node.name || node, Diagnostics.JSDoc_types_may_be_moved_to_TypeScript_types));
                    }
                }
                if (canBeConvertedToAsync(node)) {
                    addConvertToAsyncFunctionDiagnostics(node, checker, diags);
                }
                node.forEachChild(check);
            }
        }
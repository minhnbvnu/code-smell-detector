function getInsertTextAndReplacementSpanForImportCompletion(name, importStatementCompletion, origin, useSemicolons, sourceFile, options, preferences) {
            const replacementSpan = importStatementCompletion.replacementSpan;
            const quotedModuleSpecifier = quote(sourceFile, preferences, escapeSnippetText(origin.moduleSpecifier));
            const exportKind = origin.isDefaultExport ? 1 /* Default */ : origin.exportName === "export=" /* ExportEquals */ ? 2 /* ExportEquals */ : 0 /* Named */;
            const tabStop = preferences.includeCompletionsWithSnippetText ? "$1" : "";
            const importKind = ts_codefix_exports.getImportKind(sourceFile, exportKind, options, 
            /*forceImportKeyword*/
            true);
            const isImportSpecifierTypeOnly = importStatementCompletion.couldBeTypeOnlyImportSpecifier;
            const topLevelTypeOnlyText = importStatementCompletion.isTopLevelTypeOnly ? ` ${tokenToString(154 /* TypeKeyword */)} ` : " ";
            const importSpecifierTypeOnlyText = isImportSpecifierTypeOnly ? `${tokenToString(154 /* TypeKeyword */)} ` : "";
            const suffix = useSemicolons ? ";" : "";
            switch (importKind) {
                case 3 /* CommonJS */:
                    return { replacementSpan, insertText: `import${topLevelTypeOnlyText}${escapeSnippetText(name)}${tabStop} = require(${quotedModuleSpecifier})${suffix}` };
                case 1 /* Default */:
                    return { replacementSpan, insertText: `import${topLevelTypeOnlyText}${escapeSnippetText(name)}${tabStop} from ${quotedModuleSpecifier}${suffix}` };
                case 2 /* Namespace */:
                    return { replacementSpan, insertText: `import${topLevelTypeOnlyText}* as ${escapeSnippetText(name)} from ${quotedModuleSpecifier}${suffix}` };
                case 0 /* Named */:
                    return { replacementSpan, insertText: `import${topLevelTypeOnlyText}{ ${importSpecifierTypeOnlyText}${escapeSnippetText(name)}${tabStop} } from ${quotedModuleSpecifier}${suffix}` };
            }
        }
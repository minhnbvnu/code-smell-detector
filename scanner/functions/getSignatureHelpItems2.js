function getSignatureHelpItems2(fileName, position, { triggerReason } = emptyOptions) {
                synchronizeHostData();
                const sourceFile = getValidSourceFile(fileName);
                return ts_SignatureHelp_exports.getSignatureHelpItems(program, sourceFile, position, triggerReason, cancellationToken);
            }
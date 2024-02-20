function createSignatureHelpItems(candidates, resolvedSignature, { isTypeParameterList, argumentCount, argumentsSpan: applicableSpan, invocation, argumentIndex }, sourceFile, typeChecker, useFullPrefix) {
            var _a2;
            const enclosingDeclaration = getEnclosingDeclarationFromInvocation(invocation);
            const callTargetSymbol = invocation.kind === 2 /* Contextual */ ? invocation.symbol : typeChecker.getSymbolAtLocation(getExpressionFromInvocation(invocation)) || useFullPrefix && ((_a2 = resolvedSignature.declaration) == null ? void 0 : _a2.symbol);
            const callTargetDisplayParts = callTargetSymbol ? symbolToDisplayParts(typeChecker, callTargetSymbol, useFullPrefix ? sourceFile : void 0, 
            /*meaning*/
            void 0) : emptyArray;
            const items = map(candidates, (candidateSignature) => getSignatureHelpItem(candidateSignature, callTargetDisplayParts, isTypeParameterList, typeChecker, enclosingDeclaration, sourceFile));
            if (argumentIndex !== 0) {
                Debug.assertLessThan(argumentIndex, argumentCount);
            }
            let selectedItemIndex = 0;
            let itemsSeen = 0;
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                if (candidates[i] === resolvedSignature) {
                    selectedItemIndex = itemsSeen;
                    if (item.length > 1) {
                        let count = 0;
                        for (const i2 of item) {
                            if (i2.isVariadic || i2.parameters.length >= argumentCount) {
                                selectedItemIndex = itemsSeen + count;
                                break;
                            }
                            count++;
                        }
                    }
                }
                itemsSeen += item.length;
            }
            Debug.assert(selectedItemIndex !== -1);
            const help = { items: flatMapToMutable(items, identity), applicableSpan, selectedItemIndex, argumentIndex, argumentCount };
            const selected = help.items[selectedItemIndex];
            if (selected.isVariadic) {
                const firstRest = findIndex(selected.parameters, (p) => !!p.isRest);
                if (-1 < firstRest && firstRest < selected.parameters.length - 1) {
                    help.argumentIndex = selected.parameters.length;
                }
                else {
                    help.argumentIndex = Math.min(help.argumentIndex, selected.parameters.length - 1);
                }
            }
            return help;
        }
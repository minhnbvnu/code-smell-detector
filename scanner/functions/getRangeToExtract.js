function getRangeToExtract(context, considerEmptySpans = true) {
            const { file, startPosition } = context;
            const isJS = isSourceFileJS(file);
            const current = getTokenAtPosition(file, startPosition);
            const range = createTextRangeFromSpan(getRefactorContextSpan(context));
            const cursorRequest = range.pos === range.end && considerEmptySpans;
            const selection = findAncestor(current, (node) => node.parent && isTypeNode(node) && !rangeContainsSkipTrivia(range, node.parent, file) && (cursorRequest || nodeOverlapsWithStartEnd(current, file, range.pos, range.end)));
            if (!selection || !isTypeNode(selection))
                return { error: getLocaleSpecificMessage(Diagnostics.Selection_is_not_a_valid_type_node) };
            const checker = context.program.getTypeChecker();
            const enclosingNode = getEnclosingNode(selection, isJS);
            if (enclosingNode === void 0)
                return { error: getLocaleSpecificMessage(Diagnostics.No_type_could_be_extracted_from_this_type_node) };
            const typeParameters = collectTypeParameters(checker, selection, enclosingNode, file);
            if (!typeParameters)
                return { error: getLocaleSpecificMessage(Diagnostics.No_type_could_be_extracted_from_this_type_node) };
            const typeElements = flattenTypeLiteralNodeReference(checker, selection);
            return { isJS, selection, enclosingNode, typeParameters, typeElements };
        }
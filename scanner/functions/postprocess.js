function postprocess(analyzer, node) {
        /**
         * Ends the code path for the current node.
         * @returns {void}
         */
        function endCodePath() {
            let codePath = analyzer.codePath;
            // Mark the current path as the final node.
            CodePath.getState(codePath).makeFinal();
            // Emits onCodePathSegmentEnd event of the current segments.
            leaveFromCurrentSegment(analyzer, node);
            // Emits onCodePathEnd event of this code path.
            debug.dump(`onCodePathEnd ${codePath.id}`);
            analyzer.emitter.emit("onCodePathEnd", codePath, node);
            debug.dumpDot(codePath);
            codePath = analyzer.codePath = analyzer.codePath.upper;
            if (codePath) {
                debug.dumpState(node, CodePath.getState(codePath), true);
            }
        }
        switch (node.type) {
            case "Program":
            case "FunctionDeclaration":
            case "FunctionExpression":
            case "ArrowFunctionExpression":
            case "StaticBlock": {
                endCodePath();
                break;
            }
            // The `arguments.length >= 1` case is in `preprocess` function.
            case "CallExpression":
                if (node.optional === true && node.arguments.length === 0) {
                    CodePath.getState(analyzer.codePath).makeOptionalRight();
                }
                break;
            default:
                break;
        }
        /*
         * Special case: The right side of class field initializer is considered
         * to be its own function, so we need to end a code path in this
         * case.
         *
         * We need to check after the other checks in order to close the
         * code paths in the correct order for code like this:
         *
         *
         * class Foo {
         *     a = () => {}
         * }
         *
         * In this case, The ArrowFunctionExpression code path is closed first
         * and then we need to close the code path for the PropertyDefinition
         * value.
         */
        if (isPropertyDefinitionValue(node)) {
            endCodePath();
        }
    }
function checkIndividualNode(node, { singleLine }) {
                var _a, _b, _c;
                const beforeColon = (_a = (singleLine
                    ? options.singleLine
                        ? options.singleLine.beforeColon
                        : options.beforeColon
                    : options.multiLine
                        ? options.multiLine.beforeColon
                        : options.beforeColon)) !== null && _a !== void 0 ? _a : false;
                const expectedWhitespaceBeforeColon = beforeColon ? 1 : 0;
                const afterColon = (_b = (singleLine
                    ? options.singleLine
                        ? options.singleLine.afterColon
                        : options.afterColon
                    : options.multiLine
                        ? options.multiLine.afterColon
                        : options.afterColon)) !== null && _b !== void 0 ? _b : true;
                const expectedWhitespaceAfterColon = afterColon ? 1 : 0;
                const mode = (_c = (singleLine
                    ? options.singleLine
                        ? options.singleLine.mode
                        : options.mode
                    : options.multiLine
                        ? options.multiLine.mode
                        : options.mode)) !== null && _c !== void 0 ? _c : 'strict';
                if (isApplicable(node)) {
                    checkBeforeColon(node, expectedWhitespaceBeforeColon, mode);
                    checkAfterColon(node, expectedWhitespaceAfterColon, mode);
                }
            }
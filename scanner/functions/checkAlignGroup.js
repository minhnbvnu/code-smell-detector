function checkAlignGroup(group) {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                let alignColumn = 0;
                const align = (_d = (typeof options.align === 'object'
                    ? options.align.on
                    : typeof ((_a = options.multiLine) === null || _a === void 0 ? void 0 : _a.align) === 'object'
                        ? options.multiLine.align.on
                        : (_c = (_b = options.multiLine) === null || _b === void 0 ? void 0 : _b.align) !== null && _c !== void 0 ? _c : options.align)) !== null && _d !== void 0 ? _d : 'colon';
                const beforeColon = (_e = (typeof options.align === 'object'
                    ? options.align.beforeColon
                    : options.multiLine
                        ? typeof options.multiLine.align === 'object'
                            ? options.multiLine.align.beforeColon
                            : options.multiLine.beforeColon
                        : options.beforeColon)) !== null && _e !== void 0 ? _e : false;
                const expectedWhitespaceBeforeColon = beforeColon ? 1 : 0;
                const afterColon = (_f = (typeof options.align === 'object'
                    ? options.align.afterColon
                    : options.multiLine
                        ? typeof options.multiLine.align === 'object'
                            ? options.multiLine.align.afterColon
                            : options.multiLine.afterColon
                        : options.afterColon)) !== null && _f !== void 0 ? _f : true;
                const expectedWhitespaceAfterColon = afterColon ? 1 : 0;
                const mode = (_h = (typeof options.align === 'object'
                    ? options.align.mode
                    : options.multiLine
                        ? typeof options.multiLine.align === 'object'
                            ? // same behavior as in original rule
                                (_g = options.multiLine.align.mode) !== null && _g !== void 0 ? _g : options.multiLine.mode
                            : options.multiLine.mode
                        : options.mode)) !== null && _h !== void 0 ? _h : 'strict';
                for (const node of group) {
                    if (isKeyTypeNode(node)) {
                        const keyEnd = adjustedColumn(getKeyLocEnd(node));
                        alignColumn = Math.max(alignColumn, align === 'colon'
                            ? keyEnd + expectedWhitespaceBeforeColon
                            : keyEnd +
                                ':'.length +
                                expectedWhitespaceAfterColon +
                                expectedWhitespaceBeforeColon);
                    }
                }
                for (const node of group) {
                    if (!isApplicable(node)) {
                        continue;
                    }
                    const { typeAnnotation } = node;
                    const toCheck = align === 'colon' ? typeAnnotation : typeAnnotation.typeAnnotation;
                    const difference = adjustedColumn(toCheck.loc.start) - alignColumn;
                    if (difference) {
                        context.report({
                            node,
                            messageId: difference > 0
                                ? align === 'colon'
                                    ? 'extraKey'
                                    : 'extraValue'
                                : align === 'colon'
                                    ? 'missingKey'
                                    : 'missingValue',
                            fix: fixer => {
                                if (difference > 0) {
                                    return fixer.removeRange([
                                        toCheck.range[0] - difference,
                                        toCheck.range[0],
                                    ]);
                                }
                                else {
                                    return fixer.insertTextBefore(toCheck, ' '.repeat(-difference));
                                }
                            },
                            data: {
                                computed: '',
                                key: getKeyText(node),
                            },
                        });
                    }
                    if (align === 'colon') {
                        checkAfterColon(node, expectedWhitespaceAfterColon, mode);
                    }
                    else {
                        checkBeforeColon(node, expectedWhitespaceBeforeColon, mode);
                    }
                }
            }
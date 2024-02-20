function checkJSDoc(node) {
                const jsdocNode = sourceCode.getJSDocComment(node), functionData = fns.pop(), paramTagsByName = Object.create(null), paramTags = [];
                let hasReturns = false, returnsTag, hasConstructor = false, isInterface = false, isOverride = false, isAbstract = false;
                // make sure only to validate JSDoc comments
                if (jsdocNode) {
                    let jsdoc;
                    try {
                        jsdoc = doctrine.parse(jsdocNode.value, {
                            strict: true,
                            unwrap: true,
                            sloppy: true,
                            range: true
                        });
                    }
                    catch (ex) {
                        if (/braces/iu.test(ex.message)) {
                            context.report({ node: jsdocNode, messageId: "missingBrace" });
                        }
                        else {
                            context.report({ node: jsdocNode, messageId: "syntaxError" });
                        }
                        return;
                    }
                    jsdoc.tags.forEach(tag => {
                        switch (tag.title.toLowerCase()) {
                            case "param":
                            case "arg":
                            case "argument":
                                paramTags.push(tag);
                                break;
                            case "return":
                            case "returns":
                                hasReturns = true;
                                returnsTag = tag;
                                break;
                            case "constructor":
                            case "class":
                                hasConstructor = true;
                                break;
                            case "override":
                            case "inheritdoc":
                                isOverride = true;
                                break;
                            case "abstract":
                            case "virtual":
                                isAbstract = true;
                                break;
                            case "interface":
                                isInterface = true;
                                break;
                            // no default
                        }
                        // check tag preferences
                        if (Object.prototype.hasOwnProperty.call(prefer, tag.title) && tag.title !== prefer[tag.title]) {
                            const entireTagRange = getAbsoluteRange(jsdocNode, tag);
                            context.report({
                                node: jsdocNode,
                                messageId: "use",
                                loc: {
                                    start: entireTagRange.start,
                                    end: {
                                        line: entireTagRange.start.line,
                                        column: entireTagRange.start.column + `@${tag.title}`.length
                                    }
                                },
                                data: { name: prefer[tag.title] },
                                fix(fixer) {
                                    return fixer.replaceTextRange([
                                        jsdocNode.range[0] + tag.range[0] + 3,
                                        jsdocNode.range[0] + tag.range[0] + tag.title.length + 3
                                    ], prefer[tag.title]);
                                }
                            });
                        }
                        // validate the types
                        if (checkPreferType && tag.type) {
                            validateType(jsdocNode, tag.type);
                        }
                    });
                    paramTags.forEach(param => {
                        if (requireParamType && !param.type) {
                            context.report({
                                node: jsdocNode,
                                messageId: "missingParamType",
                                loc: getAbsoluteRange(jsdocNode, param),
                                data: { name: param.name }
                            });
                        }
                        if (!param.description && requireParamDescription) {
                            context.report({
                                node: jsdocNode,
                                messageId: "missingParamDesc",
                                loc: getAbsoluteRange(jsdocNode, param),
                                data: { name: param.name }
                            });
                        }
                        if (paramTagsByName[param.name]) {
                            context.report({
                                node: jsdocNode,
                                messageId: "duplicateParam",
                                loc: getAbsoluteRange(jsdocNode, param),
                                data: { name: param.name }
                            });
                        }
                        else if (!param.name.includes(".")) {
                            paramTagsByName[param.name] = param;
                        }
                    });
                    if (hasReturns) {
                        if (!requireReturn && !functionData.returnPresent && (returnsTag.type === null || !isValidReturnType(returnsTag)) && !isAbstract) {
                            context.report({
                                node: jsdocNode,
                                messageId: "unexpectedTag",
                                loc: getAbsoluteRange(jsdocNode, returnsTag),
                                data: {
                                    title: returnsTag.title
                                }
                            });
                        }
                        else {
                            if (requireReturnType && !returnsTag.type) {
                                context.report({ node: jsdocNode, messageId: "missingReturnType" });
                            }
                            if (!isValidReturnType(returnsTag) && !returnsTag.description && requireReturnDescription) {
                                context.report({ node: jsdocNode, messageId: "missingReturnDesc" });
                            }
                        }
                    }
                    // check for functions missing @returns
                    if (!isOverride && !hasReturns && !hasConstructor && !isInterface &&
                        node.parent.kind !== "get" && node.parent.kind !== "constructor" &&
                        node.parent.kind !== "set" && !isTypeClass(node)) {
                        if (requireReturn || (functionData.returnPresent && !node.async)) {
                            context.report({
                                node: jsdocNode,
                                messageId: "missingReturn",
                                data: {
                                    returns: prefer.returns || "returns"
                                }
                            });
                        }
                    }
                    // check the parameters
                    const jsdocParamNames = Object.keys(paramTagsByName);
                    if (node.params) {
                        node.params.forEach((param, paramsIndex) => {
                            const bindingParam = param.type === "AssignmentPattern"
                                ? param.left
                                : param;
                            // TODO(nzakas): Figure out logical things to do with destructured, default, rest params
                            if (bindingParam.type === "Identifier") {
                                const name = bindingParam.name;
                                if (jsdocParamNames[paramsIndex] && (name !== jsdocParamNames[paramsIndex])) {
                                    context.report({
                                        node: jsdocNode,
                                        messageId: "expected",
                                        loc: getAbsoluteRange(jsdocNode, paramTagsByName[jsdocParamNames[paramsIndex]]),
                                        data: {
                                            name,
                                            jsdocName: jsdocParamNames[paramsIndex]
                                        }
                                    });
                                }
                                else if (!paramTagsByName[name] && !isOverride) {
                                    context.report({
                                        node: jsdocNode,
                                        messageId: "missingParam",
                                        data: {
                                            name
                                        }
                                    });
                                }
                            }
                        });
                    }
                    if (options.matchDescription) {
                        const regex = new RegExp(options.matchDescription, "u");
                        if (!regex.test(jsdoc.description)) {
                            context.report({ node: jsdocNode, messageId: "unsatisfiedDesc" });
                        }
                    }
                }
            }
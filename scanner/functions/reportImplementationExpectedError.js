function reportImplementationExpectedError(node) {
                    if (node.name && nodeIsMissing(node.name)) {
                        return;
                    }
                    let seen = false;
                    const subsequentNode = forEachChild(node.parent, (c) => {
                        if (seen) {
                            return c;
                        }
                        else {
                            seen = c === node;
                        }
                    });
                    if (subsequentNode && subsequentNode.pos === node.end) {
                        if (subsequentNode.kind === node.kind) {
                            const errorNode2 = subsequentNode.name || subsequentNode;
                            const subsequentName = subsequentNode.name;
                            if (node.name && subsequentName && // both are private identifiers
                                (isPrivateIdentifier(node.name) && isPrivateIdentifier(subsequentName) && node.name.escapedText === subsequentName.escapedText || // Both are computed property names
                                    // TODO: GH#17345: These are methods, so handle computed name case. (`Always allowing computed property names is *not* the correct behavior!)
                                    isComputedPropertyName(node.name) && isComputedPropertyName(subsequentName) || // Both are literal property names that are the same.
                                    isPropertyNameLiteral(node.name) && isPropertyNameLiteral(subsequentName) && getEscapedTextOfIdentifierOrLiteral(node.name) === getEscapedTextOfIdentifierOrLiteral(subsequentName))) {
                                const reportError = (node.kind === 171 /* MethodDeclaration */ || node.kind === 170 /* MethodSignature */) && isStatic(node) !== isStatic(subsequentNode);
                                if (reportError) {
                                    const diagnostic = isStatic(node) ? Diagnostics.Function_overload_must_be_static : Diagnostics.Function_overload_must_not_be_static;
                                    error(errorNode2, diagnostic);
                                }
                                return;
                            }
                            if (nodeIsPresent(subsequentNode.body)) {
                                error(errorNode2, Diagnostics.Function_implementation_name_must_be_0, declarationNameToString(node.name));
                                return;
                            }
                        }
                    }
                    const errorNode = node.name || node;
                    if (isConstructor) {
                        error(errorNode, Diagnostics.Constructor_implementation_is_missing);
                    }
                    else {
                        if (hasSyntacticModifier(node, 256 /* Abstract */)) {
                            error(errorNode, Diagnostics.All_declarations_of_an_abstract_method_must_be_consecutive);
                        }
                        else {
                            error(errorNode, Diagnostics.Function_implementation_is_missing_or_not_immediately_following_the_declaration);
                        }
                    }
                }
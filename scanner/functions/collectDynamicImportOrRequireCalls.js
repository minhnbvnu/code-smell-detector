function collectDynamicImportOrRequireCalls(file2) {
                    const r = /import|require/g;
                    while (r.exec(file2.text) !== null) {
                        const node = getNodeAtPosition(file2, r.lastIndex);
                        if (shouldProcessRequires && isRequireCall(node, 
                        /*checkArgumentIsStringLiteralLike*/
                        true)) {
                            setParentRecursive(node, 
                            /*incremental*/
                            false);
                            imports = append(imports, node.arguments[0]);
                        }
                        else if (isImportCall(node) && node.arguments.length >= 1 && isStringLiteralLike(node.arguments[0])) {
                            setParentRecursive(node, 
                            /*incremental*/
                            false);
                            imports = append(imports, node.arguments[0]);
                        }
                        else if (isLiteralImportTypeNode(node)) {
                            setParentRecursive(node, 
                            /*incremental*/
                            false);
                            imports = append(imports, node.argument.literal);
                        }
                    }
                }
function checkImportBinding(node) {
                checkCollisionsForDeclarationName(node, node.name);
                checkAliasSymbol(node);
                if (node.kind === 273 /* ImportSpecifier */ && idText(node.propertyName || node.name) === "default" && getESModuleInterop(compilerOptions) && moduleKind !== 4 /* System */ && (moduleKind < 5 /* ES2015 */ || getSourceFileOfNode(node).impliedNodeFormat === 1 /* CommonJS */)) {
                    checkExternalEmitHelpers(node, 131072 /* ImportDefault */);
                }
            }
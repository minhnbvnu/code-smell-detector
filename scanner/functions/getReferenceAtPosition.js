function getReferenceAtPosition(sourceFile, position, program) {
            var _a2, _b, _c, _d;
            const referencePath = findReferenceInPosition(sourceFile.referencedFiles, position);
            if (referencePath) {
                const file = program.getSourceFileFromReference(sourceFile, referencePath);
                return file && { reference: referencePath, fileName: file.fileName, file, unverified: false };
            }
            const typeReferenceDirective = findReferenceInPosition(sourceFile.typeReferenceDirectives, position);
            if (typeReferenceDirective) {
                const reference = (_a2 = program.getResolvedTypeReferenceDirectives().get(typeReferenceDirective.fileName, typeReferenceDirective.resolutionMode || sourceFile.impliedNodeFormat)) == null ? void 0 : _a2.resolvedTypeReferenceDirective;
                const file = reference && program.getSourceFile(reference.resolvedFileName);
                return file && { reference: typeReferenceDirective, fileName: file.fileName, file, unverified: false };
            }
            const libReferenceDirective = findReferenceInPosition(sourceFile.libReferenceDirectives, position);
            if (libReferenceDirective) {
                const file = program.getLibFileFromReference(libReferenceDirective);
                return file && { reference: libReferenceDirective, fileName: file.fileName, file, unverified: false };
            }
            if ((_b = sourceFile.resolvedModules) == null ? void 0 : _b.size()) {
                const node = getTouchingToken(sourceFile, position);
                if (isModuleSpecifierLike(node) && isExternalModuleNameRelative(node.text) && sourceFile.resolvedModules.has(node.text, getModeForUsageLocation(sourceFile, node))) {
                    const verifiedFileName = (_d = (_c = sourceFile.resolvedModules.get(node.text, getModeForUsageLocation(sourceFile, node))) == null ? void 0 : _c.resolvedModule) == null ? void 0 : _d.resolvedFileName;
                    const fileName = verifiedFileName || resolvePath(getDirectoryPath(sourceFile.fileName), node.text);
                    return {
                        file: program.getSourceFile(fileName),
                        fileName,
                        reference: {
                            pos: node.getStart(),
                            end: node.getEnd(),
                            fileName: node.text
                        },
                        unverified: !verifiedFileName
                    };
                }
            }
            return void 0;
        }
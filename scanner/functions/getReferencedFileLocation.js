function getReferencedFileLocation(getSourceFileByPath, ref) {
            var _a2, _b, _c, _d, _e, _f;
            const file = Debug.checkDefined(getSourceFileByPath(ref.file));
            const { kind, index } = ref;
            let pos, end, packageId, resolutionMode;
            switch (kind) {
                case 3 /* Import */:
                    const importLiteral = getModuleNameStringLiteralAt(file, index);
                    packageId = (_c = (_b = (_a2 = file.resolvedModules) == null ? void 0 : _a2.get(importLiteral.text, getModeForResolutionAtIndex(file, index))) == null ? void 0 : _b.resolvedModule) == null ? void 0 : _c.packageId;
                    if (importLiteral.pos === -1)
                        return { file, packageId, text: importLiteral.text };
                    pos = skipTrivia(file.text, importLiteral.pos);
                    end = importLiteral.end;
                    break;
                case 4 /* ReferenceFile */:
                    ({ pos, end } = file.referencedFiles[index]);
                    break;
                case 5 /* TypeReferenceDirective */:
                    ({ pos, end, resolutionMode } = file.typeReferenceDirectives[index]);
                    packageId = (_f = (_e = (_d = file.resolvedTypeReferenceDirectiveNames) == null ? void 0 : _d.get(toFileNameLowerCase(file.typeReferenceDirectives[index].fileName), resolutionMode || file.impliedNodeFormat)) == null ? void 0 : _e.resolvedTypeReferenceDirective) == null ? void 0 : _f.packageId;
                    break;
                case 7 /* LibReferenceDirective */:
                    ({ pos, end } = file.libReferenceDirectives[index]);
                    break;
                default:
                    return Debug.assertNever(kind);
            }
            return { file, pos, end, packageId };
        }
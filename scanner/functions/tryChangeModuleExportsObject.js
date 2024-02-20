function tryChangeModuleExportsObject(object, useSitesToUnqualify) {
            const statements = mapAllOrFail(object.properties, (prop) => {
                switch (prop.kind) {
                    case 174 /* GetAccessor */:
                    case 175 /* SetAccessor */:
                    case 300 /* ShorthandPropertyAssignment */:
                    case 301 /* SpreadAssignment */:
                        return void 0;
                    case 299 /* PropertyAssignment */:
                        return !isIdentifier(prop.name) ? void 0 : convertExportsDotXEquals_replaceNode(prop.name.text, prop.initializer, useSitesToUnqualify);
                    case 171 /* MethodDeclaration */:
                        return !isIdentifier(prop.name) ? void 0 : functionExpressionToDeclaration(prop.name.text, [factory.createToken(93 /* ExportKeyword */)], prop, useSitesToUnqualify);
                    default:
                        Debug.assertNever(prop, `Convert to ES6 got invalid prop kind ${prop.kind}`);
                }
            });
            return statements && [statements, false];
        }
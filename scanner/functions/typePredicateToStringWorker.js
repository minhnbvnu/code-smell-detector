function typePredicateToStringWorker(writer2) {
                    const predicate = factory.createTypePredicateNode(typePredicate.kind === 2 /* AssertsThis */ || typePredicate.kind === 3 /* AssertsIdentifier */ ? factory.createToken(129 /* AssertsKeyword */) : void 0, typePredicate.kind === 1 /* Identifier */ || typePredicate.kind === 3 /* AssertsIdentifier */ ? factory.createIdentifier(typePredicate.parameterName) : factory.createThisTypeNode(), typePredicate.type && nodeBuilder.typeToTypeNode(typePredicate.type, enclosingDeclaration, toNodeBuilderFlags(flags) | 70221824 /* IgnoreErrors */ | 512 /* WriteTypeParametersInQualifiedName */)
                    // TODO: GH#18217
                    );
                    const printer = createPrinterWithRemoveComments();
                    const sourceFile = enclosingDeclaration && getSourceFileOfNode(enclosingDeclaration);
                    printer.writeNode(4 /* Unspecified */, predicate, 
                    /*sourceFile*/
                    sourceFile, writer2);
                    return writer2;
                }
function signatureToString(signature, enclosingDeclaration, flags = 0 /* None */, kind, writer) {
                return writer ? signatureToStringWorker(writer).getText() : usingSingleLineStringWriter(signatureToStringWorker);
                function signatureToStringWorker(writer2) {
                    let sigOutput;
                    if (flags & 262144 /* WriteArrowStyleSignature */) {
                        sigOutput = kind === 1 /* Construct */ ? 182 /* ConstructorType */ : 181 /* FunctionType */;
                    }
                    else {
                        sigOutput = kind === 1 /* Construct */ ? 177 /* ConstructSignature */ : 176 /* CallSignature */;
                    }
                    const sig = nodeBuilder.signatureToSignatureDeclaration(signature, sigOutput, enclosingDeclaration, toNodeBuilderFlags(flags) | 70221824 /* IgnoreErrors */ | 512 /* WriteTypeParametersInQualifiedName */);
                    const printer = createPrinterWithRemoveCommentsOmitTrailingSemicolon();
                    const sourceFile = enclosingDeclaration && getSourceFileOfNode(enclosingDeclaration);
                    printer.writeNode(4 /* Unspecified */, sig, 
                    /*sourceFile*/
                    sourceFile, getTrailingSemicolonDeferringWriter(writer2));
                    return writer2;
                }
            }
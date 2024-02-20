function getInstantiatedSignatures(signatures) {
                    const applicableSignatures = filter(signatures, (sig) => !!sig.typeParameters && hasCorrectTypeArgumentArity(sig, typeArguments));
                    return sameMap(applicableSignatures, (sig) => {
                        const typeArgumentTypes = checkTypeArguments(sig, typeArguments, 
                        /*reportErrors*/
                        true);
                        return typeArgumentTypes ? getSignatureInstantiation(sig, typeArgumentTypes, isInJSFile(sig.declaration)) : sig;
                    });
                }
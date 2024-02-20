function createElidedInformationPlaceholder(context) {
                    context.approximateLength += 3;
                    if (!(context.flags & 1 /* NoTruncation */)) {
                        return factory.createTypeReferenceNode(factory.createIdentifier("..."), 
                        /*typeArguments*/
                        void 0);
                    }
                    return factory.createKeywordTypeNode(131 /* AnyKeyword */);
                }
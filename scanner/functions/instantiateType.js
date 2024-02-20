function instantiateType(type, mapper) {
                return type && mapper ? instantiateTypeWithAlias(type, mapper, 
                /*aliasSymbol*/
                void 0, 
                /*aliasTypeArguments*/
                void 0) : type;
            }
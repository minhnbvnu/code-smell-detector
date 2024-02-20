function getThisTypeArgument(type) {
                return getObjectFlags(type) & 4 /* Reference */ && type.target === globalThisType ? getTypeArguments(type)[0] : void 0;
            }
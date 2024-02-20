function parseJSDocNonNullableType() {
                        const pos = getNodePos();
                        nextToken();
                        return finishNode(factory2.createJSDocNonNullableType(parseNonArrayType(), 
                        /*postfix*/
                        false), pos);
                    }
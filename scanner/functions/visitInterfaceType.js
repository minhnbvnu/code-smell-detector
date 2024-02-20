function visitInterfaceType(interfaceT) {
                    visitObjectType(interfaceT);
                    forEach(interfaceT.typeParameters, visitType);
                    forEach(getBaseTypes(interfaceT), visitType);
                    visitType(interfaceT.thisType);
                }
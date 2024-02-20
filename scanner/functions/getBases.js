function getBases(type, typeDecl) {
        type.extendsTypeLinks = getBaseTypeLinks(typeDecl.extendsList, type.extendsTypeLinks);
        type.implementsTypeLinks = getBaseTypeLinks(typeDecl.implementsList, type.implementsTypeLinks);
    }
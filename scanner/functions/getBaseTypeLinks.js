function getBaseTypeLinks(bases, baseTypeLinks) {
        if(bases) {
            var len = bases.members.length;
            if(baseTypeLinks == null) {
                baseTypeLinks = new Array();
            }
            for(var i = 0; i < len; i++) {
                var baseExpr = bases.members[i];
                var name = baseExpr;
                var typeLink = new TypeScript.TypeLink();
                typeLink.ast = name;
                baseTypeLinks[baseTypeLinks.length] = typeLink;
            }
        }
        return baseTypeLinks;
    }
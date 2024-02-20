function getNameOfJSDocTypedef(declaration) {
            return declaration.name || nameForNamelessJSDocTypedef(declaration);
        }
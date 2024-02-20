function createNewConstructGroupForType(type) {
        var signature = new TypeScript.Signature();
        signature.returnType = new TypeScript.TypeLink();
        signature.returnType.type = type.instanceType;
        signature.parameters = [];
        type.construct = new TypeScript.SignatureGroup();
        type.construct.addSignature(signature);
    }
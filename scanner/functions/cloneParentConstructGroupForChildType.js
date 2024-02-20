function cloneParentConstructGroupForChildType(child, parent) {
        child.construct = new TypeScript.SignatureGroup();
        var sig = null;
        if(!parent.construct) {
            createNewConstructGroupForType(parent);
        }
        for(var i = 0; i < parent.construct.signatures.length; i++) {
            sig = new TypeScript.Signature();
            sig.parameters = parent.construct.signatures[i].parameters;
            sig.nonOptionalParameterCount = parent.construct.signatures[i].nonOptionalParameterCount;
            sig.typeCheckStatus = parent.construct.signatures[i].typeCheckStatus;
            sig.declAST = parent.construct.signatures[i].declAST;
            sig.returnType = new TypeScript.TypeLink();
            sig.returnType.type = child.instanceType;
            child.construct.addSignature(sig);
        }
    }
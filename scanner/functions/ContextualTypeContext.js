function ContextualTypeContext(contextualType, provisional, contextID) {
            this.contextualType = contextualType;
            this.provisional = provisional;
            this.contextID = contextID;
            this.targetSig = null;
            this.targetThis = null;
            this.targetAccessorType = null;
        }
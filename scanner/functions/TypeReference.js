function TypeReference(term, arrayCount) {
                _super.call(this, TypeScript.NodeType.TypeRef);
            this.term = term;
            this.arrayCount = arrayCount;
        }
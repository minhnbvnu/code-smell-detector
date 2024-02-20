function NamedDeclaration(nodeType, name, members) {
                _super.call(this, nodeType);
            this.name = name;
            this.members = members;
            this.leftCurlyCount = 0;
            this.rightCurlyCount = 0;
        }
function ExtendFinderVisitor() {
            this._visitor = new visitor_1.default(this);
            this.contexts = [];
            this.allExtendsStack = [[]];
        }
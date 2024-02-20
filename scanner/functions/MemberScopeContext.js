function MemberScopeContext(flow, pos, matchFlag) {
            this.flow = flow;
            this.pos = pos;
            this.matchFlag = matchFlag;
            this.type = null;
            this.ast = null;
            this.options = new TypeScript.AstWalkOptions();
        }
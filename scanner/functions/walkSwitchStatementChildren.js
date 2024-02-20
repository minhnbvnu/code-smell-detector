function walkSwitchStatementChildren(preAst, parent, walker) {
            if(preAst.val) {
                preAst.val = walker.walk(preAst.val, preAst);
            }
            if((preAst.caseList) && walker.options.goNextSibling) {
                preAst.caseList = walker.walk(preAst.caseList, preAst);
            }
        }
function isReturnVoidStatementInConstructorWithCapturedSuper(node) {
                return (hierarchyFacts & 8192 /* ConstructorWithCapturedSuper */) !== 0 && node.kind === 250 /* ReturnStatement */ && !node.expression;
            }
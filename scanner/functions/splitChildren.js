function splitChildren(children, pivotOn, separateTrailingSemicolon = true) {
            if (children.length < 2) {
                return children;
            }
            const splitTokenIndex = findIndex(children, pivotOn);
            if (splitTokenIndex === -1) {
                return children;
            }
            const leftChildren = children.slice(0, splitTokenIndex);
            const splitToken = children[splitTokenIndex];
            const lastToken = last(children);
            const separateLastToken = separateTrailingSemicolon && lastToken.kind === 26 /* SemicolonToken */;
            const rightChildren = children.slice(splitTokenIndex + 1, separateLastToken ? children.length - 1 : void 0);
            const result = compact([
                leftChildren.length ? createSyntaxList2(leftChildren) : void 0,
                splitToken,
                rightChildren.length ? createSyntaxList2(rightChildren) : void 0
            ]);
            return separateLastToken ? result.concat(lastToken) : result;
        }
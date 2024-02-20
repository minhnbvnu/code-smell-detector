function getInfo9(sourceFile, pos, diagCode) {
            const node = getTokenAtPosition(sourceFile, pos);
            if (isIdentifier(node) || isPrivateIdentifier(node)) {
                return { node, className: diagCode === didYouMeanStaticMemberCode ? getContainingClass(node).name.text : void 0 };
            }
        }
function isCallToHelper(firstSegment, helperName) {
            return isCallExpression(firstSegment) && isIdentifier(firstSegment.expression) && (getEmitFlags(firstSegment.expression) & 8192 /* HelperName */) !== 0 && firstSegment.expression.escapedText === helperName;
        }
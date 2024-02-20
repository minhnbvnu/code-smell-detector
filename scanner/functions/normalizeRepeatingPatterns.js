function normalizeRepeatingPatterns(rightText, expressionCount, previousLeftText, optionallyChainedCode, previous, current) {
        const leftText = previousLeftText;
        let invalidOptionallyChainedPrivateProperty = false;
        // omit weird doubled up expression that make no sense like foo.bar && foo.bar
        if (rightText !== previousLeftText) {
            expressionCount += 1;
            previousLeftText = rightText;
            /*
            Diff the left and right text to construct the fix string
            There are the following cases:
        
            1)
            rightText === 'foo.bar.baz.buzz'
            leftText === 'foo.bar.baz'
            diff === '.buzz'
        
            2)
            rightText === 'foo.bar.baz.buzz()'
            leftText === 'foo.bar.baz'
            diff === '.buzz()'
        
            3)
            rightText === 'foo.bar.baz.buzz()'
            leftText === 'foo.bar.baz.buzz'
            diff === '()'
        
            4)
            rightText === 'foo.bar.baz[buzz]'
            leftText === 'foo.bar.baz'
            diff === '[buzz]'
        
            5)
            rightText === 'foo.bar.baz?.buzz'
            leftText === 'foo.bar.baz'
            diff === '?.buzz'
            */
            const diff = rightText.replace(leftText, '');
            if (diff.startsWith('.#')) {
                // Do not handle direct optional chaining on private properties because of a typescript bug (https://github.com/microsoft/TypeScript/issues/42734)
                // We still allow in computed properties
                invalidOptionallyChainedPrivateProperty = true;
            }
            if (diff.startsWith('?')) {
                // item was "pre optional chained"
                optionallyChainedCode += diff;
            }
            else {
                const needsDot = diff.startsWith('(') || diff.startsWith('[');
                optionallyChainedCode += `?${needsDot ? '.' : ''}${diff}`;
            }
        }
        previous = current;
        current = util.nullThrows(current.parent, util.NullThrowsReasons.MissingParent);
        return {
            invalidOptionallyChainedPrivateProperty,
            expressionCount,
            previousLeftText,
            optionallyChainedCode,
            previous,
            current,
        };
    }
function testDisjunction(version2, alternatives) {
            if (alternatives.length === 0)
                return true;
            for (const alternative of alternatives) {
                if (testAlternative(version2, alternative))
                    return true;
            }
            return false;
        }
function testAlternative(version2, comparators) {
            for (const comparator of comparators) {
                if (!testComparator(version2, comparator.operator, comparator.operand))
                    return false;
            }
            return true;
        }
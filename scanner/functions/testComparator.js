function testComparator(version2, operator, operand) {
            const cmp = version2.compareTo(operand);
            switch (operator) {
                case "<":
                    return cmp < 0;
                case "<=":
                    return cmp <= 0;
                case ">":
                    return cmp > 0;
                case ">=":
                    return cmp >= 0;
                case "=":
                    return cmp === 0;
                default:
                    return Debug.assertNever(operator);
            }
        }
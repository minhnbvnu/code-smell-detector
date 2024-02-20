function createSyntaxList2(children) {
            Debug.assertGreaterThanOrEqual(children.length, 1);
            return setTextRangePosEnd(parseNodeFactory.createSyntaxList(children), children[0].pos, last(children).end);
        }
function getList(list) {
                            return list && rangeContainsStartEnd(getVisualListRange(node, list, sourceFile), start, end) ? list : void 0;
                        }
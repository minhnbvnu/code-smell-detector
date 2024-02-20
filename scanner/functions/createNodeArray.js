function createNodeArray(elements, pos, end, hasTrailingComma) {
                        const array = factoryCreateNodeArray(elements, hasTrailingComma);
                        setTextRangePosEnd(array, pos, end != null ? end : scanner2.getStartPos());
                        return array;
                    }
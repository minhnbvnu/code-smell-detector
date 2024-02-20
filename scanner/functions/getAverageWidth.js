function getAverageWidth() {
                var tb = ut.table,
                    averageWidth, sumWidth = 0, colsNum = 0,
                    tbAttr = getDefaultValue(me, tb);

                if (ut.isFullRow()) {
                    sumWidth = tb.offsetWidth;
                    colsNum = ut.colsNum;
                } else {
                    var begin = ut.cellsRange.beginColIndex,
                        end = ut.cellsRange.endColIndex,
                        node;
                    for (var i = begin; i <= end;) {
                        node = ut.selectedTds[i];
                        sumWidth += node.offsetWidth;
                        i += node.colSpan;
                        colsNum += 1;
                    }
                }
                averageWidth = Math.ceil(sumWidth / colsNum) - tbAttr.tdBorder * 2 - tbAttr.tdPadding * 2;
                return averageWidth;
            }
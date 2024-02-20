function setAverageWidth(averageWidth) {
                utils.each(domUtils.getElementsByTagName(ut.table, "th"), function (node) {
                    node.setAttribute("width", "");
                });
                var cells = ut.isFullRow() ? domUtils.getElementsByTagName(ut.table, "td") : ut.selectedTds;

                utils.each(cells, function (node) {
                    if (node.colSpan == 1) {
                        node.setAttribute("width", averageWidth);
                    }
                });
            }
function emptyCellsUntil(endCol) {
            while (col < endCol) {
                // try to grab a cell from the level above and extend its rowspan. otherwise, create a fresh cell
                td = (loneCellMatrix[i - 1] || [])[col];
                if (td) {
                    td.attr('rowspan', parseInt(td.attr('rowspan') || 1, 10) + 1);
                }
                else {
                    td = $('<td/>');
                    tr.append(td);
                }
                cellMatrix[i][col] = td;
                loneCellMatrix[i][col] = td;
                col++;
            }
        }
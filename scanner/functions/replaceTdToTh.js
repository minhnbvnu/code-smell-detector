function replaceTdToTh(rowIndex, cell, tableRow) {
                if (rowIndex == 0) {
                    var th = cell.nextSibling || cell.previousSibling;
                    if (th.tagName == 'TH') {
                        th = cell.ownerDocument.createElement("th");
                        th.appendChild(cell.firstChild);
                        tableRow.insertBefore(th, cell);
                        domUtils.remove(cell)
                    }
                }else{
                    if (cell.tagName == 'TH') {
                        var td = cell.ownerDocument.createElement("td");
                        td.appendChild(cell.firstChild);
                        tableRow.insertBefore(td, cell);
                        domUtils.remove(cell)
                    }
                }
            }
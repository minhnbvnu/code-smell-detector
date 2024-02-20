function createTotalRow(newCells, columns) {
            for (var i = 0; i < columns; i++) {
                newCells[i] = newRow.insertCell(i);
                newCells[i].style.textAlign = window.getComputedStyle(tableStyle).textAlign;
                newCells[i].style.fontWeight = "bold";
            }
            switch (columns) {
                case 3:
                    newCells[0].appendChild(document.createTextNode("Total"));
                    newCells[0].style.textAlign = "";
                    newCells[0].style = "text-align:left; font-weight: bold;";
                    newCells[1].appendChild(document.createTextNode(totalDuration.toFixed(1).toString() + " sec"));
                    break;
                default:
                    newCells[0].appendChild(document.createTextNode("Total"));
                    newCells[0].style.textAlign = "";
                    newCells[0].style = "text-align:left; font-weight: bold;";
                    newCells[1].appendChild(document.createTextNode(totalDuration.toFixed(1).toString() + " sec"));
                    newCells[2].appendChild(document.createTextNode(totalFail.toString()));
                    newCells[4].appendChild(document.createTextNode(totalSkip.toString()));
                    newCells[6].appendChild(document.createTextNode(totalPass.toString()));
                    newCells[8].appendChild(document.createTextNode(totalTotal.toString()));
                    newCells[9].appendChild(document.createTextNode(""));
                    break;
            }
        }
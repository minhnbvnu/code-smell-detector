function doDblClick(evt) {
            clearTimeout(timer);
            var ut = getUETable(table),
                start = table.rows[0].cells[0],
                end = ut.getLastCell(),
                range = ut.getCellsRange(start, end);
            editor.selection.getRange().setStart(start, 0).setCursor(false, true);
            ut.setSelected(range);
        }
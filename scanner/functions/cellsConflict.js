function cellsConflict(cell1,cell2){
    var yMin1 = cell1.y;
    var yMax1 = cell1.y - 1 + (cell1.rowSpan || 1);
    var yMin2 = cell2.y;
    var yMax2 = cell2.y - 1 + (cell2.rowSpan || 1);
    var yConflict = !(yMin1 > yMax2 || yMin2 > yMax1);

    var xMin1= cell1.x;
    var xMax1 = cell1.x - 1 + (cell1.colSpan || 1);
    var xMin2= cell2.x;
    var xMax2 = cell2.x - 1 + (cell2.colSpan || 1);
    var xConflict = !(xMin1 > xMax2 || xMin2 > xMax1);

    return yConflict && xConflict;
  }
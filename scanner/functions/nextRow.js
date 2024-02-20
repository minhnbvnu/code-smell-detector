function nextRow() {
    curCol = 0;
    curRow++;
    adjustRow(0, colCount, -1); // Decrement row spans by one
  }
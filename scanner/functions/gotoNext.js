function gotoNext(e,o,t){if(null==e&&null==o&&canCellBeActive(e=o=t=0,o))return{row:e,cell:o,posX:o};var n=gotoRight(e,o,t);if(n)return n;var l=null,r=getDataLengthIncludingAddNew();for(e===r-1&&e--;++e<r;)if(null!==(l=findFirstFocusableCell(e)))return{row:e,cell:l,posX:l};return null}
function setActiveRow(e,o,t){initialized&&(e>getDataLength()||e<0||o>=columns.length||o<0||(activeRow=e,t||scrollCellIntoView(e,o||0,!1)))}
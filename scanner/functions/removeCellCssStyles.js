function removeCellCssStyles(e){cellCssClasses[e]&&(updateCellCssStylesOnRenderedRows(null,cellCssClasses[e]),delete cellCssClasses[e],trigger(self.onCellCssStylesChanged,{key:e,hash:null,grid:self}))}